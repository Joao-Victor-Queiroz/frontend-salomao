'use client'
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { useForm, Controller} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CrismandoSchemaType, crismandoSchema } from "../schemas";
import { FileText, User, Phone, Hash, Calendar, Map, MapPin, Home, Heart, BookOpen } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { IMaskInput } from 'react-imask';
import { cn } from "@/lib/utils";
import { registerCrismando } from "../actions";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

type FormType = "REGISTER" | "EDIT"

type Props = {
    type: FormType;
    initialValues?: CrismandoSchemaType;
}

export function CrismandoForm({ type, initialValues}: Props) {
    const {handleSubmit, register, control, formState: { isSubmitting, errors, isLoading}} = useForm<CrismandoSchemaType>({
        resolver: zodResolver(crismandoSchema),
        defaultValues: initialValues,
        mode: 'onChange',
    })

    const router = useRouter();


    const onSubmit = async(data: CrismandoSchemaType) => {
       console.log('Função de registro chamada')
       const result = await registerCrismando(data)
       

       if(!result.success){
        toast.error('Erro ao cadastrar crismando.')
        return console.log('Erro ao cadastrar crismando')
       }

       toast.success('Crismando cadastrado com sucesso!')
       router.back();

       return console.log('Crismando registrado com sucesso: ', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <SectionTitle title={type === "REGISTER" ? "Cadastrar Crismando(a)" : `Editar Crismando(a): ${initialValues?.nomeCrismando}`}/>
           <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b pb-2">
                <User size={20} className="text-blue-600" /> Dados Pessoais
                </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                    <FieldLabel>Nome do Crismando</FieldLabel>
                    <Input placeholder="Nome completo" error={errors.nomeCrismando?.message} {...register('nomeCrismando')} />
                </Field>

                <Field>
                    <FieldLabel>CPF</FieldLabel>
                    <Input placeholder="Apenas números" error={errors.cpf?.message} {...register('cpf')} />
                </Field>

                <Field>
                    <FieldLabel>Idade</FieldLabel>
                    <Input type="number" placeholder="Ex: 15" error={errors.idade?.message} {...register('idade', { valueAsNumber: true })} />
                </Field>

                <Field>
                    <FieldLabel>Data de Nascimento</FieldLabel>
                    <Input type="date" error={errors.dataNascimento?.message} {...register('dataNascimento')} />
                </Field>

                <Field>
                    <FieldLabel>Telefone</FieldLabel>
                    <Controller 
                        control={control}
                        name="telefoneCrismando"
                        render={({field: {onChange, value, ref}}) => (
                            // <Input placeholder="(00) 00000-0000" error={errors.telefoneCrismando?.message} {...register('telefoneCrismando', )} />
                            <IMaskInput 
                                mask="(00) 00000-0000"
                                value={value}
                                onAccept={(value) => onChange(value)}
                                placeholder="Telefone do crismando"
                                inputRef={ref}
                                className={cn(
                                            "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40" 
                                )}
                            />
                        )}
                    />
                </Field>

                <div className="grid grid-cols-3 gap-2 md:col-span-1">
                    <Field className='col-span-2'>
                        <FieldLabel>Cidade Natal</FieldLabel>
                        <Input placeholder="Cidade" error={errors.cidadeNascimento?.message} {...register('cidadeNascimento')} />
                    </Field>
                    <Field>
                        <FieldLabel>UF</FieldLabel>
                        <Input placeholder="PB" error={errors.estadoNascimento?.message} {...register('estadoNascimento')} />
                    </Field>
                </div>
            </div>
      </section>

      {/* SEÇÃO: ENDEREÇO */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b pb-2">
          <MapPin size={20} className="text-green-600" /> Endereço
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Field>
                <FieldLabel>Rua/Avenida</FieldLabel>
                <Input placeholder="Logradouro" error={errors.endereco?.message} {...register('endereco')} />
            </Field>
          </div>
          <Field>
            <FieldLabel>Número</FieldLabel>
            <Input placeholder="Nº" error={errors.numEndereco?.message} {...register('numEndereco')} />
          </Field>
          <Field>
            <FieldLabel>Bairro</FieldLabel>
            <Input placeholder="Bairro" error={errors.bairro?.message} {...register('bairro')} />
          </Field>
          <Field>
            <FieldLabel>CEP</FieldLabel>
               <Controller 
                        control={control}
                        name="cep"
                        render={({field: {onChange, value}}) => (
                            <IMaskInput 
                                mask="00000-000"
                                value={value}
                                onAccept={(value) => onChange(value)}
                                placeholder="CEP"
                                className={cn(
                                            "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40" 
                                )}
                            />
                        )}
                    />
          </Field>
          <Field>
            <FieldLabel>Complemento</FieldLabel>
            <Input placeholder="Apto, Bloco..." error={errors.complemento?.message} {...register('complemento')} />
          </Field>
        </div>
      </section>

      {/* SEÇÃO: DADOS DOS RESPONSÁVEIS */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b pb-2">
          <Heart size={20} className="text-red-600" /> Dados dos Responsáveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Nome do Pai</FieldLabel>
            <Input placeholder="Nome do pai" error={errors.nomePai?.message} {...register('nomePai')} />
          </Field>
          <Field>
            <FieldLabel>Telefone do Pai</FieldLabel>
               <Controller 
                        control={control}
                        name="telefonePai"
                        render={({field: {onChange, value, ref}}) => (
                            <IMaskInput 
                                mask="(00) 00000-0000"
                                value={value}
                                onAccept={(value) => onChange(value)}
                                placeholder="Telefone do pai"
                                inputRef={ref}
                                className={cn(
                                            "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40" 
                                )}
                            />
                        )}
                    />
          </Field>
          <Field>
            <FieldLabel>Nome da Mãe</FieldLabel>
            <Input placeholder="Nome da mãe" error={errors.nomeMae?.message} {...register('nomeMae')} />
          </Field>
          <Field>
            <FieldLabel>Telefone da Mãe</FieldLabel>
               <Controller 
                        control={control}
                        name="telefoneMae"
                        render={({field: {onChange, value, ref}}) => (
                            <IMaskInput 
                                mask="(00) 00000-0000"
                                value={value}
                                onAccept={(value) => onChange(value)}
                                placeholder="Telefone da mãe"
                                inputRef={ref}
                                className={cn(
                                            "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40" 
                                )}
                            />
                        )}
                    />
          </Field>
        </div>
      </section>

      {/* SEÇÃO: DADOS DO CRISTÃO */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b pb-2">
          <BookOpen size={20} className="text-purple-600" /> Dados do Cristão
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <FieldLabel>Já é batizado?</FieldLabel>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Sim" {...register('batizado')} className="w-4 h-4 text-blue-600" /> Sim
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Não" {...register('batizado')} className="w-4 h-4 text-blue-600" /> Não
              </label>
            </div>
            {errors.batizado && <p className="text-sm text-red-500 mt-1">{errors.batizado.message}</p>}
          </div>

          <div className="space-y-2">
            <FieldLabel>Fez a Primeira Eucaristia?</FieldLabel>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Sim" {...register('primeiraEucaristia')} className="w-4 h-4 text-blue-600" /> Sim
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Não" {...register('primeiraEucaristia')} className="w-4 h-4 text-blue-600" /> Não
              </label>
            </div>
            {errors.primeiraEucaristia && <p className="text-sm text-red-500 mt-1">{errors.primeiraEucaristia.message}</p>}
          </div>

          <div className="md:col-span-2">
            <FieldLabel>Justificativa/Observações</FieldLabel>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                placeholder="Por que deseja fazer a Crisma agora?"
                {...register('justificativa')}
              />
            </div>
            {errors.justificativa && <p className="text-sm text-red-500 mt-1">{errors.justificativa.message}</p>}
          </div>
        </div>
      </section>
            <Button type="submit" disabled={isSubmitting || isLoading} className="w-full">
                {isSubmitting ? 'Criando...' : 'Criar crismando(a)'}
            </Button>
        </form>
    )

}