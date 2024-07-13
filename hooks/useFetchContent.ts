import axios from "axios";
import { useEffect, useState } from "react";

export interface Pokemon {
    name: string;
    url: string;
}

export function useFetchContent() {
    const baseUri = process.env.EXPO_PUBLIC_API_URL; // Make sure this is correctly configured
    const [loadingData, setLoadingData] = useState(false);
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    
    const [loadingDetail, setLoadingDetail] = useState<boolean>(true)
    const [detailPokemonData, setDetailPokemonData] = useState<any>([])

    const fetchPokemonData = async (url: string) => {
        try {
            setLoadingData(true);
            const response = await axios.get(url);
            setNextPageUrl(response.data.next);
            setPokemonData(prevData => [...prevData, ...response.data.results]);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        } finally {
            setLoadingData(false);
        }
    };

    const fetchDetailPokemonData = async (url: string) => {
        try {
            setLoadingDetail(true);
            const response = await axios.get(url);
            setDetailPokemonData(response.data)
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        } finally {
            setLoadingDetail(false);
        }
    };

    const getPokemonData = () => {
        const initialUrl = `${baseUri}pokemon?limit=10`;
        fetchPokemonData(initialUrl);
    };

    const getDetailPokemonData = (id: string) => {
        const initialUrl = `${baseUri}pokemon/${id}`;
        fetchDetailPokemonData(initialUrl);
    };


    const loadMorePokemonData = () => {
        if (nextPageUrl) {
            fetchPokemonData(nextPageUrl);
        }
    };

    useEffect(() => {
        getPokemonData();
    }, []);

    return { loadingData, pokemonData, loadMorePokemonData, getDetailPokemonData, loadingDetail, detailPokemonData };
}
