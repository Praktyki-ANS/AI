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
      title: "Bart",
      description : "Model facebook/bart-large-cnn to zaawansowany model oparty na architekturze BART (Bidirectional and Auto-Regressive Transformers), zaprojektowany specjalnie do zadań przetwarzania języka naturalnego, w tym sumaryzacji tekstu. BART łączy cechy modeli BERT (bidirectional) i GPT (autoregresyjny), co pozwala na efektywne przetwarzanie tekstu zarówno w kontekście, jak i w sekwencyjnie generowanych odpowiedziach. Model ten, wytrenowany na dużych zbiorach danych, takich jak artykuły prasowe, pozwala na generowanie streszczeń tekstów o różnej długości, zachowując ich sens i strukturalną spójność. Jest uznawany za jeden z najskuteczniejszych modeli do sumaryzacji tekstu, szczególnie w zadaniach, które wymagają wysokiej jakości streszczenia dokumentów.",
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
  

  