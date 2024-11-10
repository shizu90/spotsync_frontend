import { useState } from "react";
import { AddressForm, AddressFormValues } from "./address-form";
import { RegisterForm, RegisterFormValues } from "./register-form";
import { SignUpSuccess } from "./success";

export type SignUpData = RegisterFormValues & { address: AddressFormValues };

type SignUpStep = 'register' | 'address' | 'success';

export function SignUp() {
    const [currentStep, setCurrentStep] = useState<SignUpStep>('register');
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

    const steps = {
        'register': <RegisterForm 
            next={() => setCurrentStep('address')}
            signUpData={signUpData} 
            setSignUpData={(data: RegisterFormValues) => setSignUpData({...signUpData, ...data})}/>,
        'address': <AddressForm
            next={() => setCurrentStep('success')}
            prev={() => setCurrentStep('register')}
            signUpData={signUpData}
            setSignUpData={(data: AddressFormValues) => setSignUpData({...signUpData, address: data})}/>,
        'success': <SignUpSuccess data={signUpData}/>
    };

    return (
        <div className="w-[480px]">
            {steps[currentStep]}
        </div>
    );
}