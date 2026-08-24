"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ChevronRight } from "lucide-react";
import { SelectContent } from "../ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "../ui/card";
import { createOrden, OrdenState } from "@/lib/actions/crear-orden";

const orderSchema = z
  .object({
    clientName: z.string().min(2, "Ingresa el nombre del cliente"),
    phone: z.string().min(8, "Ingresa un teléfono válido"),
    email: z.string().email("Ingresa un correo válido"),
    address: z.string().min(5, "Ingresa la dirección del inmueble"),
    city: z.string().min(2, "Ingresa la ciudad o barrio"),
    propertyType: z.string().min(1, "Selecciona un tipo de inmueble"),
    age: z.coerce
      .number()
      .int()
      .min(0, "Debe ser 0 o mayor")
      .max(200, "Revisa la antigüedad"),
    reforms: z.boolean(),
    reformDetails: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.reforms &&
      (!data.reformDetails || data.reformDetails.trim().length < 3)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["reformDetails"],
        message: "Describe brevemente las reformas",
      });
    }
  });

type OrderForm = z.infer<typeof orderSchema>;
type Order = OrderForm & { id: string; status: string; createdAt: string };

const initialOrders: Order[] = [
  {
    id: "ORD-1048",
    clientName: "María González",
    phone: "300 555 0182",
    email: "maria@email.com",
    address: "Calle 92 # 14-20",
    city: "Chapinero, Bogotá",
    propertyType: "Apartamento",
    age: 8,
    reforms: true,
    reformDetails: "Cocina y baños renovados",
    status: "En revisión",
    createdAt: "Hoy, 9:42 AM",
  },
  {
    id: "ORD-1047",
    clientName: "Carlos Ramírez",
    phone: "310 555 4431",
    email: "carlos@email.com",
    address: "Carrera 7 # 118-05",
    city: "Usaquén, Bogotá",
    propertyType: "Casa",
    age: 12,
    reforms: false,
    reformDetails: "",
    status: "Pendiente",
    createdAt: "Ayer, 4:16 PM",
  },
  {
    id: "ORD-1046",
    clientName: "Laura Torres",
    phone: "315 555 7720",
    email: "laura@email.com",
    address: "Carrera 38 # 8-15",
    city: "El Poblado, Medellín",
    propertyType: "Apartamento",
    age: 3,
    reforms: false,
    reformDetails: "",
    status: "Completada",
    createdAt: "12 Jun, 11:08 AM",
  },
];

const initialState: OrdenState = { status: "idle" };

function OrderDialog() {
  const [state, formAction, isPending] = useActionState(
    createOrden,
    initialState,
  );
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: { reforms: false, age: 0, propertyType: "Apartamento" },
  });
  const reforms = form.watch("reforms");

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.clientName} ${order.address}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Ficha registrada", {
        description: "La orden fue registrada exitosamente.",
      });
      form.reset();
      setOpen(false);
    } else if (state.status === "error") {
      toast.error("No se pudo registrar", { description: state.message });
    }
  }, [state, form]);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    formData.append("clientName", data.clientName);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("propertyType", data.propertyType);
    formData.append("age", String(data.age));
    formData.append("reforms", data.reforms ? "true" : "false");
    if (data.reformDetails) {
      formData.append("reformDetails", data.reformDetails);
    }

    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="cursor-pointer flex gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus data-icon="inline-start" /> Crear nueva orden
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear nueva orden</DialogTitle>
          <DialogDescription>
            Completa los datos del cliente y del inmueble para dar de alta la
            solicitud.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 pt-2">
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                1
              </span>{" "}
              Datos del cliente
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre completo"
                error={form.formState.errors.clientName?.message}
              >
                <Input
                  placeholder="Ej. María González"
                  {...form.register("clientName")}
                />
              </Field>
              <Field
                label="Teléfono"
                error={form.formState.errors.phone?.message}
              >
                <Input placeholder="300 555 0000" {...form.register("phone")} />
              </Field>
            </div>
            <Field
              label="Correo electrónico"
              error={form.formState.errors.email?.message}
            >
              <Input
                type="email"
                placeholder="cliente@correo.com"
                {...form.register("email")}
              />
            </Field>
          </section>
          <section className="flex flex-col gap-4 border-t pt-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                2
              </span>{" "}
              Datos del inmueble
            </div>
            <Field
              label="Dirección"
              error={form.formState.errors.address?.message}
            >
              <Input
                placeholder="Ej. Calle 92 # 14-20"
                {...form.register("address")}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Barrio / ciudad"
                error={form.formState.errors.city?.message}
              >
                <Input
                  placeholder="Ej. Chapinero, Bogotá"
                  {...form.register("city")}
                />
              </Field>
              <Field
                label="Tipo de inmueble"
                error={form.formState.errors.propertyType?.message}
              >
                <Select
                  value={form.watch("propertyType")}
                  onValueChange={(value) =>
                    form.setValue("propertyType", value!, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                    <SelectItem value="local">Local comercial</SelectItem>
                    <SelectItem value="ph">Ph</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field
              label="Antigüedad (años)"
              error={form.formState.errors.age?.message}
            >
              <Input type="number" min="0" {...form.register("age")} />
            </Field>
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
              <div>
                <Label htmlFor="reforms">¿Tiene reformas?</Label>
                <p className="text-sm text-muted-foreground">
                  Indica si el inmueble ha sido remodelado.
                </p>
              </div>
              <Switch
                id="reforms"
                checked={reforms}
                onCheckedChange={(checked) =>
                  form.setValue("reforms", checked, {
                    shouldValidate: true,
                  })
                }
              />
            </div>
            {reforms && (
              <Field
                label="Detalle de reformas"
                error={form.formState.errors.reformDetails?.message}
              >
                <Textarea
                  placeholder="Cuéntanos qué espacios fueron reformados..."
                  {...form.register("reformDetails")}
                />
              </Field>
            )}
          </section>
          <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creando..." : "Crear orden"}
              {!isPending && <ChevronRight data-icon="inline-end" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDialog;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}