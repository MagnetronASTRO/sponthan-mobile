import { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import MultiSelect from 'react-native-multiple-select';

export default function CategoryForm({onCategoriesSelect, selectedCategories}) {
    const [categories, setCategories] = useState(null);

    const onSelectedItemsChange = (selectedItems) => {
        onCategoriesSelect(selectedItems);
    };

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
        <View>
            {categories ? (
                <MultiSelect
                    hideTags
                    items={categories}
                    uniqueKey="id"
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedCategories}
                    selectText="Select Items"
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#00BFA5"
                    submitButtonText="Submit"
                />
            ) : (
                <ActivityIndicator />
            )}
        </View>
    );
}
