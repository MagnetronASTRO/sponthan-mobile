import { Alert } from "react-native";
import { Card, Button, Text } from "@rneui/base";


export default function EventCard({ event }) {
    function createPaymentAlert() {
        Alert.alert('Ticket bought 🎫', 'Check your email')
    }

    return (
        <Card>
            <Card.Title>{event.name.toUpperCase()}</Card.Title>
            <Card.Divider />
            <Card.Image
                style={{ padding: 0 }}
                source={{
                uri: `${event.image?.image}`,
                }}
            />
            <Text h5 style={{ marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>
               {event.location}
            </Text>
            <Text h6 style={{ marginBottom: 10, textAlign: 'center' }}>
                {new Date(event.date).toLocaleString()} {event.category}
            </Text>
            
            <Text style={{ marginBottom: 10 }}>
            {event.description}
            </Text>
            <Button
                buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                }}
                title="BUY TICKET"
                onPress={createPaymentAlert}
            />
        </Card>
    )
}
