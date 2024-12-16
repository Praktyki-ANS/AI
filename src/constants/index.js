 import { chat1, chat2, chat3, chat4, chat5, chat6 } from "../assets"
 
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
      quickTip: "Hej jestem Bart. Napisz mi tekst a pomogę ci go sumaryzwoać.",
      imageUrl: chat1,
      title: "Bart ",
      description : "facebook/bart-large-cnn to zaawansowany model oparty na architekturze BART, zaprojektowany specjalnie do sumaryzacji tekstu. Łączy cechy modeli BERT i GPT, co pozwala na efektywne przetwarzanie tekstu oraz generowanie spójnych streszczeń o różnej długości, zachowując przy tym istotne informacje.",
    },
    {
      id: "1",
      type: "chat",
      link: "/model/1",
      quickTip: "Cześć jestem Helsinki. Napisz coś po polsku a przetłumaczę to na angielski.",
      imageUrl: chat2,
      title: "Helsinki ",
      description : "Model Helsinki-NLP, oparty na architekturze transformera, skutecznie tłumaczy, analizując kontekst w całym zdaniu. Dzięki treningowi na dużych zbiorach danych tłumaczeniowych rozumie strukturę języka i zależności między słowami, zapewniając wysoką jakość tłumaczeń, zwłaszcza w przypadku złożonych zdań.",
    },
    {
      id: "2",
      type: "chat",
      link: "/model/2",
      quickTip: "Witaj jestem J-hartman. Napisz mi jak się czuejsz a ocenię twoje emocje",
      imageUrl: chat3,
      title: "J-hartmann",
      description : "j-hartmann/emotion-english-distilroberta-base to model DistilRoBERTa, przystosowany do analizy emocji w anglojęzycznych tekstach. Skupia się na klasyfikacji emocji, takich jak radość, smutek, złość czy strach, oferując szybsze i bardziej efektywne predykcje w porównaniu do pełnej wersji RoBERTa, co czyni go użytecznym narzędziem w analizie sentymentu.",
    },
    {
      id: "3",
      type: "chat",
      link: "/model/3",
      quickTip: "Dzień dobry jestem Deepset. Sprawdzam działanie kodu błędów ",
      imageUrl: chat4,
      title: "Deepset ",
      description : "Model deepset/roberta-base-squad2 stanowi potężne narzędzie do analizy i przetwarzania języka naturalnego, oferując użytkownikom możliwość uzyskiwania precyzyjnych odpowiedzi na pytania w oparciu o dostarczony kontekst.",
    },
    {
      id: "4",
      type: "chat",
      link: "/model/4",
      quickTip: "Hej jestem gpt-2. Możemy porozmawiać",
      imageUrl: chat5,
      title: "GPT-2 ",
      description : "Model openai-community/gpt2 to wersja GPT-2, zaprojektowana do generowania naturalnego tekstu na podstawie podanego wejścia. Wykorzystuje architekturę transformera i jest wytrenowana na dużych zbiorach danych, co umo żliwia tworzenie spójnych wypowiedzi.",
    },
    {
      id: "5",
      type: "chat",
      link: "/model/5",
      quickTip: "Witaj, jestem Pegasus. Pomogę ci sumaryzować tekst.",
      imageUrl: chat6,
      title: "Pegasus",
      description: "Pegasus to zaawansowany model do podsumowywania tekstu, który wykorzystuje techniki przetwarzania języka naturalnego, aby szybko i skutecznie skracać długie dokumenty do najważniejszych informacji. Idealny do użytku akademickiego i biznesowego."
    },
    {
      id: "6",
      type: "chat",
      link: "/model/6",
      imageUrl: chat6,
      quickTip: "Hej, jestem sdadas, przetłumaczę to, co napiszesz, z polskiego na angielski.",
      title: "sdadas",
      description: "Model sdadas to narzędzie do tłumaczenia, które umożliwia szybkie i dokładne przekłady tekstów z języka polskiego na angielski. Dzięki zaawansowanym algorytmom tłumaczenia, zapewnia naturalne i płynne rezultaty, idealne dla osób potrzebujących wsparcia w komunikacji międzykulturowej."
    }
  ];
  

  