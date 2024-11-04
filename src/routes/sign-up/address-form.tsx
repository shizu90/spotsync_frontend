import { Button } from "@/components/ui/button";
import { CountrySelect, StateSelect } from "@/components/ui/country-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpData } from "./sign-up";

interface AddressFormProps {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    signUpData: SignUpData;
    setSignUpData: (data: AddressFormValues) => void;
}

const formSchema = z.object({
    country: z.string().max(2, {
        message: 'Country is invalid'
    }).optional(),
    city: z.string().max(255, {
        message: 'City is too long'
    }).optional(),
    state: z.string().max(2, {
        message: 'State is invalid'
    }).optional(),
    neighborhood: z.string().max(255, {
        message: 'Neighborhood is too long'
    }).optional(),
}).superRefine(data => {
    if (data.country || data.state || data.city) {
        if (!data.state) {
            return { state: 'State is required' };
        }

        if (!data.city) {
            return { city: 'City is required' };
        }
    }
});

export type AddressFormValues = z.infer<typeof formSchema>;

export function AddressForm(props: AddressFormProps) {
    const { toast } = useToast();
    const userService = new UserService();
    const { mutateAsync: createUser, isPending } = useMutation({
        mutationFn: userService.createUser,
    });

    const addressForm = useForm<AddressFormValues>({
        defaultValues: {
            country: props.signUpData.address.country,
            city: props.signUpData.address.city,
            state: props.signUpData.address.state,
            neighborhood: props.signUpData.address.neighborhood
        },
        resolver: zodResolver(formSchema)
    });

    const handleBack = () => {
        if (props.currentStep > 0) {
            props.setCurrentStep(props.currentStep - 1);
        }
    };

    const onSubmit = (data: AddressFormValues) => {
        props.setSignUpData(data);

        let hasAddress = (data.country && data.state && data.city);

        createUser({
            name: props.signUpData.name,
            email: props.signUpData.email,
            password: props.signUpData.password,
            birth_date: props.signUpData.birthDate,
            address: hasAddress ? {
                area: data.state,
                sub_area: data.city,
                country_code: data.country,
                locality: data.neighborhood
            } : undefined
        }).then((_) => {
            props.setCurrentStep(props.currentStep + 1);
        }).catch((err) => {
            props.setCurrentStep(props.currentStep - 1);

            toast({
                "title": "Error",
                "description": err.response.data.message,
                "variant": 'destructive',
            });
        });
    };

    return (
        <div className="w-[480px] mx-2 flex flex-col justify-center gap-4">
            <h1 className="font-bold text-2xl">Address</h1>
            <p className="text-xs">
                Your address is important for filtering points of interest near your area. 
                But if you don't want to register it now, you can register it later.
            </p>
            <Form {...addressForm}>
                <form className="w-full flex flex-col gap-4" onSubmit={addressForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={addressForm.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <CountrySelect
                                        name={field.name}
                                        disabled={field.disabled}
                                        onChange={field.onChange}
                                        value={field.value}
                                        className="focus:outline-primary focus:ring-0 active:outline-primary active:ring-0"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={addressForm.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <StateSelect 
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                        className="focus:outline-primary focus:ring-0 active:outline-primary active:ring-0"
                                        country={addressForm.watch('country')}
                                        disabled={!addressForm.watch('country')}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={addressForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="City" 
                                        {...field}
                                        disabled={!addressForm.watch('state')}
                                        className="focus-visible:outline-primary focus-visible:ring-0 active:outline-primary active:ring-0"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={addressForm.control}
                        name="neighborhood"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Neighborhood</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Neighborhood" 
                                        {...field}
                                        disabled={!addressForm.watch('city')}
                                        className="focus-visible:outline-primary focus-visible:ring-0 active:outline-primary active:ring-0"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between gap-2 w-full">
                        {props.currentStep > 0 &&
                            <Button 
                                onClick={handleBack}
                                type="button"
                                className="bg-secondary text-secondary-foreground w-1/2 hover:bg-secondary/80"
                            >Back</Button>
                        }
                        <Button className={clsx(
                            props.currentStep == 0 ? "w-full" : "w-1/2"
                        )} disabled={isPending}>
                            {isPending ? <Spinner/> : "Sign up"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}