import { Button } from "@/components/ui/button";
import { CountrySelect, StateSelect } from "@/components/ui/country-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpData } from "./sign-up";

interface AddressFormProps {
    next: () => void,
    prev: () => void,
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

    const createUserFn = async (data: SignUpData) => {
        const service = new UserService();

        let hasAddress = (data.address.country && data.address.state && data.address.city);

        return await service.createUser({
            name: data.name,
            email: data.email,
            password: data.password,
            birth_date: data.birthDate,
            address: hasAddress ? {
                area: data.address.state,
                sub_area: data.address.city,
                country_code: data.address.country,
                locality: data.address.neighborhood
            } : undefined
        }).then((_) => {
            props.next();
        }).catch((err) => {
            props.prev();
            toast({
                "title": "Error",
                "description": err.response.data.message,
                "variant": 'destructive',
            });
        });
    };

    const { mutateAsync: createUser, isPending } = useMutation({
        mutationFn: createUserFn,
    });

    const addressForm = useForm<AddressFormValues>({
        defaultValues: {
            country: props.signUpData.address.country,
            city: props.signUpData.address.city,
            state: props.signUpData.address.state,
            neighborhood: props.signUpData.address.neighborhood
        },
        resolver: zodResolver(formSchema),
        mode: 'onBlur',
    });

    const handleBack = () => {
        props.prev();
    };

    const onSubmit = (data: AddressFormValues) => {
        props.setSignUpData(data);

        createUser(props.signUpData);
    };

    return (
        <div className="flex flex-col justify-center gap-4">
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
                                    />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between gap-2 w-full">
                        <Button onClick={handleBack} type="button" className="w-1/2" variant="secondary">
                            Back
                        </Button>
                        <Button className="w-1/2" disabled={isPending}>
                            {isPending ? <Spinner/> : "Sign up"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}