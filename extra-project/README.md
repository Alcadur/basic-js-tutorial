1. ### struktura i opis mało istotnych plików z punktu widzenia ćwiczeń
1. ### Uruchomienie
1. ### Opis plików JS
   1. ##### index.js
   1. ##### ProductAmountSwitcher.js
   1. ##### ProductRow.js
   1. ##### summaryService.js
1. ### Zadania

##1. Struktura i opis mało istotnych plików z punktu widzenia ćwiczeń
Wszystkie pliki źródłowe znajdują się w katalogu `src`.
* `src/assets` - folder zawiera grafiki wykorzystane w projekcie
* `src/js` - znajdują się tam pliki JavaScript odpowiedzialne za działanie projektu (opisane w osobnym rozdziale)
* `src/scss` - pliki ze stylami przed kompilacją napisane za pomocą `sass/scss`
* `src/index.html` - szablon startowego widoku, szablon wykorzystywany jest przez `HtmlWebpackPlugin`

Pliki konfiguracyjne
* `.babelrc` - konfiguracja preprocesora Babel
* `package.json` - plik `npm` zawierający podstawowe informacje o projekcie i zależności od innych paczek
* `webpack.config.js` - konfiguracja Webpacka
* `README.md` - ten plik


UWAGA!
===
Wszystkie pliki poza plikami znajdującymi się w `src/js` służą do odpalenia projektu i stworzenie widoku potrzebnego do lepszego zrozumienia mechanik które zostały
zaimplementowane. Wszelkie modyfikacje robisz na własną odpowiedzialność...

##2. Uruchomienie
Aby odpalić projekt należy za pomocą konsoli przejść do miejsca w którym znajduje się szkolenie, następnie należy przejść do katalogu `extra-project` (czyli miejsce w którym znajduje się ten plik)

W konsoli odpalamy polecenie `npm install` która instaluje nam wszystkie potrzebne paczki.

Po zainstalowaniu zależności w tym samym katalogu odpalamy `npm start` co powinno skutkować odpaleniem się serwera deweloperskiego pod adresem `localhost:9000`

##3. Opis plików JS
#### i. index.js
Plik startowy w którym znajduje się tworzenie bazowych produktów i podpięcie zdarzeń

#### ii. ProductAmountSwitcher.js
Plik zawierający źródło dla elementu modyfikującego ilość danego produktu w koszyku

#### iii. ProductRow.js
Plik odpowiadający za odpowiednie wyświetlenie jednego wiersza z produktem i akcje które są na nim wykonywane

#### iv. summaryService.js
Zawartość pliku odpowiada za naliczanie ceny końcowej która wyświetlana się w podsumowaniu

##3. Zadania