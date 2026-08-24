"use client";

import { useState } from "react";
import {
  Badge,  
  ChevronRight,
  Home,
  Search,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 8;

const estadoClasses: Record<any, string> = {
  completado: "bg-primary/10 text-primary",
  "en-proceso": "bg-chart-3/15 text-foreground",
  pendiente: "bg-muted text-muted-foreground",
  error: "bg-destructive/10 text-destructive",
};



export function OrderList({ orderss }: { orderss?: any }) {
  const [query, setQuery] = useState(""); 
  const filteredOrders = orderss.filter((order: any) =>
    `${order.id} ${order.clientName} ${order.address}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );


  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Órdenes recientes</CardTitle>
          <CardDescription>
            Consulta y revisa las solicitudes creadas.
          </CardDescription>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar orden o cliente..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {filteredOrders.map((order: any) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 border-t py-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="hidden size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground sm:flex">
                  <Home className="size-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{order.clientName}</p>
                    <Badge
                     /* variant={
                        order.status === "Completada" ? "default" : "secondary"
                      }*/
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.id} · {order.address}, {order.city}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Creada {order.createdAt}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Ver detalles <ChevronRight data-icon="inline-end" />
              </Button>
            </div>
          ))}
          {filteredOrders.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No encontramos órdenes con esa búsqueda.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
