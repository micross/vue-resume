type OpenAIStore = {
  apiKey: string | null;
};

export const useOpenAiStore = defineStore(
  'openai',
  () => {
    const apiKey = ref({
      apiKey: ''
    } as OpenAIStore);

    const setApiKey = (key: string) => {
      apiKey.value.apiKey = key;
    }

    return { apiKey, setApiKey }
  },
  {
    persist: true,
  }
);