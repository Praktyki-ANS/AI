 import { chat1, chat2, chat3} from "../assets"
 
 const apiIn = process.env.GPT_API_IN;
const apiOut = process.env.GPT_API_OUT;
 export const navLinks = [
    {
      id: "about",
      title: "O nas",
    },
    {
      id: "models",
      title: "Modele",
    },
    {
      id: "contact",
      title: "Kontakt",
    },
  ];


  export const Models = [
    {
      id: "0",
      type: "chat",
      link: "/model/1",
      apiIn,
      apiOut,
      imageUrl: chat1,
      title: "GPT 3.0",
      description : "GPT 3.0 (Generative Pre-trained Transformer 3) to zaawansowany model językowy opracowany przez OpenAI. Model ten, zbudowany na bazie 175 miliardów parametrów, jest jednym z największych modeli sztucznej inteligencji używanych do generowania języka naturalnego. ",
    },
    {
      id: "1",
      type: "chat",
      link: "/model/2",
      imageUrl: chat2,
      title: "ANS Bot",
      description : "ANS Bot to eksperymentalny model językowy będący w fazie doszkalania, który jest tworzony przez studentów na bazie modeli udostępnionych przez IBM. Model ten jest rozwijany jako część projektu akademickiego, a jego celem jest doskonalenie umiejętności rozumienia i generowania tekstu w języku naturalnym.",
    },
    {
      id: "2",
      type: "chat",
      link: "/model/3",
      imageUrl: chat3,
      title: "BERT ",
      description : "BERT to model opracowany przez Google, który jest wykorzystywany głównie do zadań związanych z przetwarzaniem języka naturalnego, takich jak klasyfikacja tekstu, analiza sentymentu czy wyszukiwanie informacji. Jest dwukierunkowy, co oznacza, że analizuje kontekst zarówno przed, jak i po słowie.",
    },
    {
      id: "3",
      type: "chat",
      link: "/model/4",
      imageUrl: chat1,
      title: "BERT ",
      description : "BERT to model opracowany przez Google, który jest wykorzystywany głównie do zadań związanych z przetwarzaniem języka naturalnego, takich jak klasyfikacja tekstu, analiza sentymentu czy wyszukiwanie informacji. Jest dwukierunkowy, co oznacza, że analizuje kontekst zarówno przed, jak i po słowie.",
    },
    {
      id: "4",
      type: "generator",
      link: "/model/4",
      imageUrl: chat3,
      title: "BERT ",
      description : "BERT to model opracowany przez Google, który jest wykorzystywany głównie do zadań związanych z przetwarzaniem języka naturalnego, takich jak klasyfikacja tekstu, analiza sentymentu czy wyszukiwanie informacji. Jest dwukierunkowy, co oznacza, że analizuje kontekst zarówno przed, jak i po słowie.",
    },
    
  ];
  

  