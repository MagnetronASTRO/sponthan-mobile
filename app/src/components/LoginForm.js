import { Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from '@rneui/themed';

export default function LoginForm() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = data => console.log(data);
    
    return (
        <View style={{ flex: 1, padding: 15, justifyContent: 'center' }} >
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
    
            <Button title="Log in" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}
