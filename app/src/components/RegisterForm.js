import { useState } from "react";
import { Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from '@rneui/themed';
import CategoryForm from "./CategoryForm";

export default function RegisterForm() {
    const [categories, setCategories] = useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    });
    const onSubmit = data => console.log(data);
    
    return (
        <View style={{ flex: 1, padding: 15, justifyContent: 'center'}} >
            <Controller
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="First name"
              />
            )}
            name="firstName"
            />
            {errors.firstName && <Text>This is required.</Text>}
    
            <Controller
            control={control}
            rules={{
                required: true,
                maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Last name'
              />
            )}
            name="lastName"
            />
            {errors.lastName && <Text>This is required.</Text>}

            <Controller
            control={control}
            rules={{
                required: true,
                maxLength: 255,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Email'
              />
            )}
            name="email"
            />
            {errors.email && <Text>This is required.</Text>}

            <Controller
            control={control}
            rules={{
                required: true,
                maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                placeholder='Password'
              />
            )}
            name="password"
            />
            {errors.password && <Text>This is required.</Text>}

            <CategoryForm onCategoriesSelect={setCategories} selectedCategories={categories} />
    
            <Button title="Register" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}
