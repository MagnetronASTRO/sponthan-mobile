import { useEffect, useState } from "react";
import { ActivityIndicator, View, FlatList, Alert } from "react-native";
import CategoryDropdown from "./CategoryDropdown";
import EventCard from "./EventCard";
import * as Location from 'expo-location';


export default function EventsList() {
    const [events, setEvents] = useState(null)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          console.log('Permission to access location was denied')
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';

    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        console.log(location)
    }

    useEffect(() => {
        async function fetchData() {
            const apiAdress = 'https://6354-149-156-8-98.eu.ngrok.io'
                try {
                    const long = location.coords.longitude;
                    const lat = location.coords.latitude;
                    const eventsResponse = await fetch(`${apiAdress}/api/events/get_nearest_events/${long},${lat}`);
                 
                    if (!eventsResponse.ok) {
                        throw new Error("Failed to fetch categories.");
                    }
    
                    const eventsData = await eventsResponse.json();
                    console.log(eventsData)
                    setEvents(eventsData);
                } catch (error) {
                    console.error(error);
                }
        }

        if (location !== null) {
            fetchData();
        }

        return () => {
            setEvents(null)
        }
    }, [location]);
    
    return (
        <View style={{ flex: 1 }}>
        {events ? (
            <FlatList
            data={events}
            renderItem={({item}) => <EventCard event={item} />}
            ListHeaderComponent={CategoryDropdown}
            />
        ) : (
            <ActivityIndicator />
        )}
        </View>
    )
}