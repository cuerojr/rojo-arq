"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Check,
  ChevronRight,
  ClipboardList,
  Home,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import OrderDialog from "./order-dialog";

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

export default function Page() {
 

  return (
    <div className="bg-muted/30 text-foreground">      
      <div className="mx-auto max-w-7xl p-6 ">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Órdenes de trabajo
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Gestioná tus órdenes de trabajo y accedé a los informes de inspección
            </p>
          </div>
          <OrderDialog />
        </div>
      </div>
    </div>
  );
}
