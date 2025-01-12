 import { chat1, chat2, chat3, chat4, chat5, chat6, chat7 } from "../assets"
 
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
      title: "Helsinki pl-eng",
      description : "Model Helsinki-NLP, oparty na architekturze transformera, skutecznie tłumaczy, analizując kontekst w całym zdaniu. Dzięki treningowi na dużych zbiorach danych tłumaczeniowych rozumie strukturę języka i zależności między słowami, zapewniając wysoką jakość tłumaczeń, zwłaszcza w przypadku złożonych zdań.",
    },
    {
      id: "2",
      type: "chat",
      link: "/model/2",
      quickTip: "Witaj jestem J-hartman. Napisz mi jak się czuejsz a ocenię twoje emocje",
      imageUrl: chat3,
      title: "Emotion Classifier",
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
    },
    {
      id: "7",
      type: "chat",
      link: "/model/7",
      imageUrl: chat7,
      quickTip: "Hej, jestem stable diffusion, wygeneruję dla ciebie obraz.",
      title: "stable diffusion",
      description: "Stable Diffusion to model generowania obrazów, który wykorzystuje sztuczną inteligencję do tworzenia realistycznych wizualizacji na podstawie wskazówek użytkownika. Jest idealnym narzędziem dla artystów i projektantów pragnących przekształcić swoje pomysły w unikalne obrazy."
    },
    {
      id: "8",
      type: "chat",
      link: "/model/8",
      quickTip: "Cześć, jestem Toxicity Classifier. Napisz coś, a ocenię, czy to jest toksyczne.",
      imageUrl: chat3,
      title: "Toxicity Classifier",
      description: "Model do klasyfikacji toksyczności, który analizuje teksty i ocenia, czy zawierają one obraźliwe lub szkodliwe treści. Używa zaawansowanych algorytmów do identyfikacji toksycznych zachowań w komunikacji."
  },
  {
      id: "9",
      type: "chat",
      link: "/model/9",
      quickTip: "Hej, jestem Paraphraser. Przekształcę twój tekst w nowe sformułowanie.",
      imageUrl: chat3,
      title: "Paraphraser",
      description: "Model do parafrazowania, który przekształca teksty w nowe sformułowania, zachowując ich pierwotne znaczenie. Idealny do tworzenia unikalnych treści na podstawie istniejących tekstów."
  },
  {
      id: "10",
      type: "chat",
      link: "/model/10",
      quickTip: "Cześć, jestem Sentiment Analyzer. Powiedz mi, co myślisz, a ocenię twoje uczucia.",
      imageUrl: chat3,
      title: "Sentiment Analyzer",
      description: "Model analizy sentymentu, który ocenia emocje wyrażone w tekstach. Używa zaawansowanych technik przetwarzania języka naturalnego do identyfikacji pozytywnych, negatywnych lub neutralnych emocji."
  },
  {
      id: "11",
      type: "chat",
      link: "/model/11",
      quickTip: "Hej, jestem Topic Classifier. Powiedz mi, o czym jest twój tekst.",
      imageUrl: chat3,
      title: "Topic Classifier",
      description: "Model klasyfikacji tematów, który identyfikuje główne tematy w tekstach. Używa algorytmów uczenia maszynowego do analizy treści i przypisywania odpowiednich etykiet."
  },
  {
      id: "12",
      type: "chat",
      link: "/model/12",
      quickTip: "Cześć, jestem Zero-Shot Classifier. Powiedz mi, o czym jest twój tekst, a ja to ocenię.",
      imageUrl: chat3,
      title: "Zero-Shot Classifier",
      description: "Model klasyfikacji zero-shot, który potrafi przypisywać etykiety do tekstów bez wcześniejszego treningu na tych konkretnych etykietach. Używa zaawansowanych technik do analizy kontekstu."
  },
  {
      id: "13",
      type: "chat",
      link: "/model/13",
      quickTip: "Hej, jestem NER Model. Powiedz mi, a zidentyfikuję istotne jednostki w twoim tekście.",
      imageUrl: chat3,
      title: "NER Model",
      description: "Model rozpoznawania nazwanych jednostek (NER), który identyfikuje i klasyfikuje istotne jednostki w tekstach, takie jak osoby, organizacje czy lokalizacje. Używa zaawansowanych algorytmów do analizy tekstu i wydobywania kluczowych informacji."
  },
  {
    id: "14",
    type: "chat",
    link: "/model/14",
    quickTip: "Cześć jestem Helsinki. Napisz coś po angielsku a przetłumaczę to na niemiecki.",
    imageUrl: chat2,
    title: "Helsinki eng-ger",
    description : "Model Helsinki-NLP, oparty na architekturze transformera, skutecznie tłumaczy, analizując kontekst w całym zdaniu. Dzięki treningowi na dużych zbiorach danych tłumaczeniowych rozumie strukturę języka i zależności między słowami, zapewniając wysoką jakość tłumaczeń, zwłaszcza w przypadku złożonych zdań.",
  },{
  id: "15",
  type: "chat",
  link: "/model/15",
  quickTip: "Cześć jestem Helsinki. Napisz coś po angielsku a przetłumaczę to na hiszpański.",
  imageUrl: chat2,
  title: "Helsinki eng-esp",
  description : "Model Helsinki-NLP, oparty na architekturze transformera, skutecznie tłumaczy, analizując kontekst w całym zdaniu. Dzięki treningowi na dużych zbiorach danych tłumaczeniowych rozumie strukturę języka i zależności między słowami, zapewniając wysoką jakość tłumaczeń, zwłaszcza w przypadku złożonych zdań.",
},
  ];
  

  