import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

export default function CategoryDropdown() {
    const [categories, setCategories] = useState(null);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const apiAdress = 'https://6354-149-156-8-98.eu.ngrok.io'
            try {
                const categoriesResponse = await fetch(apiAdress + "/api/categories");
                if (!categoriesResponse.ok) {
                    throw new Error("Failed to fetch categories.");
                }

                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, padding: 15 }}>
            {categories ? (
                <>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={categories}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
                </>
            ) : (
                <ActivityIndicator />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      marginTop: 10,
      backgroundColor: 'white'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });