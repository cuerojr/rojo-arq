"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  nombre: z.string().min(5, {
    message: "El nombre debe tener al menos 5 caracteres.",
  }),
  description: z
    .string()
    .max(200, { message: "Debe contener menos de 200 caracteres" }),
  email: z.string().email({ message: "Debe ser un email válido" }),
  telefono: z
    .string()
    .min(10, { message: "Debe contener al menos 10 números" }),
});

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      description: "",
      email: "",
      telefono: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { nombre, description, email, telefono } = values;
      const text = encodeURI(
        `Nuevo Mensaje desde la web\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${description}`,
      );
      window.open(
        `https://wa.me/5493413830273?text=${text}`,
        "_blank",
        "noopener, noreferrer",
      );
    } catch (error) {
    console.log("Error", error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="flex flex-col justify-center gap-10"
      >
        <div className="space-y-5">
          <div className="flex gap-5">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Teléfono" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="ejemplo@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Mensaje" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
          </div>
        </div>
        <Button
          className="cursor-pointer rounded-none w-full py-6"
          size="lg"
          variant="default"
          type="submit"
        >
          <span className="text-xl">Enviar</span>
        </Button>
        <div className="w-full">
          <p className="text-sm text-pretty">Envianos un mensaje y te contestaremos a la brevedad.</p>
        </div>
      </form>
    </Form>
  );
}
