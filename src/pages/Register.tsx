import React, { useState } from 'react';
import TextInput from '../components/ui/form/TextInput';
import PasswordInput from '../components/ui/form/PasswordInput';
import MailInput from '../components/ui/form/MailInput';
import PhoneInput from '../components/ui/form/PhoneInput';
import PasswordVerificator from '../components/ui/form/PasswordVerificator';

const Register : React.FC = () => {
    const [firstName,setFirstName] = useState<string>("")
    const [lastName,setLastName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [phoneNumber,setPhoneNumber] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [passwordConfirm,setPasswordConfirm] = useState<string>("")
    return (
        <main>
            <TextInput placeholder='Nom' typed={lastName} onTyping={setLastName} icon='person'/>
            <TextInput placeholder='Prénom' typed={firstName} onTyping={setFirstName} icon='person'/>
            <MailInput placeholder='Adresse mail' typed={email} onTyping={setEmail}/>
            <PhoneInput placeholder='Numéro de telephone' typed={phoneNumber} onTyping={setPhoneNumber} />
            <PasswordInput placeholder='Mot de passe' typed={password} onTyping={setPassword} />
            <PasswordInput placeholder='Confirmer mot de passe' typed={passwordConfirm} onTyping={setPasswordConfirm}  />
            <PasswordVerificator password={password} passwordConfirm={passwordConfirm}/>
        </main>
    );
};

export default Register;