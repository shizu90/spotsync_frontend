import { Button } from "@/components/ui/button";
import { CountrySelect, StateSelect } from "@/components/ui/country-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
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
});

export type AddressFormValues = z.infer<typeof formSchema>;

export function AddressForm(props: AddressFormProps) {
    const [addressData, setAddressData] = useState<AddressFormValues>({
        country: props.signUpData.address.country,
        state: props.signUpData.address.state,
        city: props.signUpData.address.city,
        neighborhood: props.signUpData.address.neighborhood
    });

    const addressForm = useForm<AddressFormValues>({
        defaultValues: addressData,
        resolver: zodResolver(formSchema)
    });

    const handleBack = () => {
        if (props.currentStep > 0) {
            props.setCurrentStep(props.currentStep - 1);
        }
    };

    const onSubmit = (data: AddressFormValues) => {
        props.setSignUpData(data);
    };

    const isCountrySelected = addressData.country != undefined;
    const isStateSelected = addressData.state != undefined;
    const isCitySelected = addressData.city != '';

    return (
        <div className="w-96 flex flex-col justify-center gap-4">
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
                                        value={addressData.country} 
                                        onChange={(v) => {
                                            field.onChange(v);
                                            setAddressData({
                                                ...addressData,
                                                country: v
                                            });
                                        }}
                                        name={field.name}
                                        disabled={field.disabled}
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
                                        value={addressData.state} 
                                        onChange={(v) => {
                                            field.onChange(v);
                                            setAddressData({
                                                ...addressData,
                                                state: v
                                            });
                                        }} 
                                        country={addressData.country}
                                        name={field.name}
                                        disabled={field.disabled}
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
                                        placeholder="City" {...field} 
                                        disabled={!(isCountrySelected && isStateSelected)}
                                        name={field.name}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setAddressData({
                                                ...addressData,
                                                city: e.target.value
                                            });
                                        }}
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
                                        disabled={!(isCountrySelected && isStateSelected && isCitySelected)}
                                        name={field.name}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setAddressData({
                                                ...addressData,
                                                neighborhood: e.target.value
                                            });
                                        }}
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
                        )}>Next</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}