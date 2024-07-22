import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Image, Heading, Box, Text, HStack, Icon, Pressable } from "native-base";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useFetchContent } from '@/hooks/useFetchContent';
import { Ionicons } from '@expo/vector-icons';
import { saveLikedItem, removeLikedItem, isItemLiked } from '@/utils/LikeHelper';

export default function PokemonDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [liked, setLiked] = useState<boolean>(false);
    const { detailPokemonData, loadingDetail, getDetailPokemonData } = useFetchContent();

    useEffect(() => {
        if (id) {
            getDetailPokemonData(id);
            (async () => {
                const likedState = await isItemLiked(id);
                setLiked(likedState);
            })();
        }
    }, [id]);

    const handleLikePress = useCallback(async () => {
        if (id) {
            if (liked) {
                await removeLikedItem(id);
            } else {
                await saveLikedItem(id);
            }
            setLiked(!liked);
        }
    }, [id, liked]);

    return (
        loadingDetail ? (
            <Box py={2} flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="large" color="#0000ff" />
            </Box>
        ) : (
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
                headerImage={<Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }} alt="" size="2xl" style={styles.headerImage} />}
            >
                <Box p={4}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <HStack>
                            <Box mr={2}>
                                <Heading>{detailPokemonData.name.toUpperCase()}</Heading>
                            </Box>
                            {detailPokemonData.types.map((item: any) => (
                                <Box mr={2}>
                                    <Text>
                                        {item.type.name}
                                    </Text>
                                </Box>
                            ))}
                        </HStack>
                        <Pressable onPress={handleLikePress}>
                            <Icon
                                as={Ionicons}
                                name={liked ? "heart" : "heart-outline"}
                                size="xl"
                                color={liked ? "red.500" : "gray.400"}
                            />
                        </Pressable>
                    </HStack>
                    <Text mt={4} fontSize="md">Height: {detailPokemonData.height}</Text>
                    <Text mt={2} fontSize="md">Weight: {detailPokemonData.weight}</Text>
                </Box>
            </ParallaxScrollView>
        )
    );
}

const styles = StyleSheet.create({
    headerImage: {
        alignSelf: "center",
        position: 'absolute',
    },
});
