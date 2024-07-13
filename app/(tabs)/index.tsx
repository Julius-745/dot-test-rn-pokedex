import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Box, FlatList, VStack, Divider, Image, HStack, Text } from 'native-base';
import { useFetchContent, Pokemon } from '@/hooks/useFetchContent';
import { Link } from 'expo-router';

export default function HomeScreen() {
    const { loadingData, pokemonData, loadMorePokemonData } = useFetchContent();

    const renderItem = ({ item }: { item: Pokemon }) => {
        const parts = item.url.split('/');
        const number = parts[parts.length - 2];
        return (
            <Box borderWidth="1" borderRadius="md" m={2} p={2}>
              <Link href={{
                pathname: "detail",
                params: {id: number} }}>
                <VStack mb={4}>
                    <Box px="4" pt="4">
                        <Text bold fontSize="lg">Pokemon</Text>
                    </Box>
                    <HStack>
                        <Box px="4">
                            <Image
                                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png` }}
                                alt={`${item.name} sprite`}
                                size={200}
                                resizeMode="contain"
                            />
                        </Box>
                        <Box px="4" justifyContent="center">
                            <Text fontSize="md">{item.name}</Text>
                        </Box>
                    </HStack>
                    <Divider mt={4} />
                </VStack>
                </Link>
            </Box>
        );
    };

    const renderFooter = () => {
        return loadingData ? (
            <Box py={2}>
                <ActivityIndicator size="large" color="#0000ff" />
            </Box>
        ) : null;
    };

    const handleLoadMore = () => {
        loadMorePokemonData();
    };

    return (
        <Box flex={1} py={5}>
            <FlatList
                data={pokemonData}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </Box>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
