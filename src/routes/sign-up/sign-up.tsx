import { useState } from "react";
import { AddressForm, AddressFormValues } from "./address-form";
import { RegisterForm, RegisterFormValues } from "./register-form";
import { SignUpSuccess } from "./success";

export type SignUpData = RegisterFormValues & { address: AddressFormValues };

export function SignUp() {
    const [currentStep, setCurrentStep] = useState(0);
    const [signUpData, setSignUpData] = useState<SignUpData>({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        birthDate: '',
        phoneNumber: '',
        address: {
            country: undefined,
            city: '',
            state: undefined,
            neighborhood: ''
        }
    });

    const steps = [
        {
            'name': 'register',
            'screen': <RegisterForm 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep}
                signUpData={signUpData}
                setSignUpData={(data: RegisterFormValues) => setSignUpData({...signUpData, ...data})}
            />
        },
        {
            'name': 'address',
            'screen': <AddressForm 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep}
                signUpData={signUpData}
                setSignUpData={(data: AddressFormValues) => setSignUpData({...signUpData, address: data})}
            />
        },
        {
            'name': 'success',
            'screen': <SignUpSuccess data={signUpData}/>
        }
    ];

    return steps[currentStep].screen;
}