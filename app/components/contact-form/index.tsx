import ButtonComponent from "../common/button";
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

const formSchema = z.object({
  nombre: z.string().min(5, {
    message: "El titulo debe tener al menos 5 caracteres.",
  }),
  description: z.string().max(200, { message: "Debe contener menos de 200 caracteres" }),
  email: z.string().email({ message: "Debe ser un email válido" }),
  telefono: z.string().min(10, { message: "Debe contener al menos 10 números"}),
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
    
    const response = await fetch('/api/send-mail', {
      method: "POST",
      body: JSON.stringify(values)
    });

    if(response.ok) {
      console.log('asdasd')
      toast({
        title: "Email enviado"
      });
      return;
    }

    toast({
      variant: "destructive",
      title: "Error enviando email.",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-8 w-[100%]"
      >
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

        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="3415123456" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
        <ButtonComponent>
          <button type="submit">
            <span>Enviar</span>
          </button>
        </ButtonComponent>
      </form>
    </Form>
  );
}
