 import { chat1, chat2, chat3, chat4, chat5, } from "../assets"
 
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
      link: "/model/0",
      apiIn,
      apiOut,
      imageUrl: chat1,
      title: "GPT 3.0",
      description : "GPT 3.0 (Generative Pre-trained Transformer 3) to zaawansowany model językowy opracowany przez OpenAI. Model ten, zbudowany na bazie 175 miliardów parametrów, jest jednym z największych modeli sztucznej inteligencji używanych do generowania języka naturalnego. ",
    },
    {
      id: "1",
      type: "chat",
      link: "/model/1",
      imageUrl: chat2,
      title: "Helsinki",
      description : "Model Helsinki-NLP, oparty na architekturze transformera, skutecznie tłumaczy, analizując kontekst w całym zdaniu. Dzięki treningowi na dużych zbiorach danych tłumaczeniowych rozumie strukturę języka i zależności między słowami, zapewniając wysoką jakość tłumaczeń, zwłaszcza w przypadku złożonych zdań.",
    },
    {
      id: "2",
      type: "chat",
      link: "/model/2",
      imageUrl: chat3,
      title: "BERT ",
      description : "BERT to model opracowany przez Google, który jest wykorzystywany głównie do zadań związanych z przetwarzaniem języka naturalnego, takich jak klasyfikacja tekstu, analiza sentymentu czy wyszukiwanie informacji. Jest dwukierunkowy, co oznacza, że analizuje kontekst zarówno przed, jak i po słowie.",
    },
    {
      id: "3",
      type: "chat",
      link: "/model/3",
      imageUrl: chat1,
      title: "BERT ",
      description : "BERT to model opracowany przez Google, który jest wykorzystywany głównie do zadań związanych z przetwarzaniem języka naturalnego, takich jak klasyfikacja tekstu, analiza sentymentu czy wyszukiwanie informacji. Jest dwukierunkowy, co oznacza, że analizuje kontekst zarówno przed, jak i po słowie.",
    },
    {
      id: "4",
      type: "chat",
      link: "/model/4",
      imageUrl: chat3,
      title: "BERT ",
      description : "BERT to model opracowany przez Google, który jest wykorzystywany głównie do zadań związanych z przetwarzaniem języka naturalnego, takich jak klasyfikacja tekstu, analiza sentymentu czy wyszukiwanie informacji. Jest dwukierunkowy, co oznacza, że analizuje kontekst zarówno przed, jak i po słowie.",
    },
    {
      id: "5",
      type: "chat",
      link: "/model/5",
      imageUrl: chat3,
      title: "BERT ",
      description : "BERT to model opracowany przez Google, który jest wykorzystywany głównie do zadań związanych z przetwarzaniem języka naturalnego, takich jak klasyfikacja tekstu, analiza sentymentu czy wyszukiwanie informacji. Jest dwukierunkowy, co oznacza, że analizuje kontekst zarówno przed, jak i po słowie.",
    }
  ];
  

  