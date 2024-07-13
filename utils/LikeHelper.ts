import AsyncStorage from '@react-native-async-storage/async-storage';

const LIKED_ITEMS_KEY = 'LIKED_ITEMS_KEY';

export const getLikedItems = async (): Promise<string[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(LIKED_ITEMS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Failed to load liked items.', e);
        return [];
    }
};

export const saveLikedItem = async (id: string) => {
    try {
        const likedItems = await getLikedItems();
        likedItems.push(id);
        const jsonValue = JSON.stringify(likedItems);
        await AsyncStorage.setItem(LIKED_ITEMS_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save liked item.', e);
    }
};

export const removeLikedItem = async (id: string) => {
    try {
        let likedItems = await getLikedItems();
        likedItems = likedItems.filter(item => item !== id);
        const jsonValue = JSON.stringify(likedItems);
        await AsyncStorage.setItem(LIKED_ITEMS_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to remove liked item.', e);
    }
};

export const isItemLiked = async (id: string): Promise<boolean> => {
    try {
        const likedItems = await getLikedItems();
        return likedItems.includes(id);
    } catch (e) {
        console.error('Failed to check if item is liked.', e);
        return false;
    }
};
