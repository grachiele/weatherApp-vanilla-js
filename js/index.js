function onSubmit(e) {
  e.preventDefault();

  let countryCode = e.target.elements[0].value;

  let cityName = e.target.elements[1].value;
  const APIKEY = "1b3292d8476ca73faee1a365e843fbb1";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&APPID=${APIKEY}&units=imperial`


  if (cityName === "") {
    alert("You need to enter a city!")
  } else {
    fetch(weatherUrl)
      .then((res) => {
        return res.json()
      })
      .then((response) => {
        let fiveDay = getFiveDay(response);
        showWeather(fiveDay);
      });
    }
}

function onSubmitCoords(e) {
  e.preventDefault();
  const APIKEY = "1b3292d8476ca73faee1a365e843fbb1";
  let position = navigator.geolocation.getCurrentPosition(function (pos){
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${APIKEY}&units=imperial`;
    fetch(weatherUrl)
        .then((res) => {
          return res.json()
        })
        .then((response) => {
          let fiveDay = getFiveDay(response);
          showWeather(fiveDay);
        });
  }, function (err) {
    alert("You need to have location services enabled!")
  });

}

function getFiveDay(obj) {
  let forecast = obj.list;
  let city = obj.city

  let fiveDay = []

  for (index in forecast) {
    let weather = forecast[index];
    if (index === 0) {
      fiveDay.push(weather);
    }
    if (index % 8 === 0){
      fiveDay.push(weather);
    }
  }

  let newObj = {
    city,
    fiveDay
  }

  return newObj
}

function showWeather(obj) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let weatherArea = document.querySelector("#weather-area")
  let city = `<h1 id="current-city">Weather for: ${obj.city.name}</h1>`
  let fiveDayArr = obj.fiveDay
  let weatherStuff = fiveDayArr.map(day => {
    let date = day.dt_txt.split(" ")[0].split("-");
    let html = `<li class="weather-day"><div class="weather-stuff"><h3>${months[parseInt(date[1]- 1)] + " " + date[2] + ", " + date[0]}</h3><img class="weather-pic" src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" /><h6 class="description">${day.weather[0].description}</h6></div><ul class="temperature-list"><li class="temperatures">High: <span class="temperature">${parseInt(day.main.temp_max)} &#8457</span></li><li class="temperatures">Low: <span class="temperature">${parseInt(day.main.temp_min)} &#8457</span></li></ul></li>`;

  return html;
})
  weatherArea.innerHTML = city + `<div id="table"><ul id="five-day"></ul></div>`
  let weatherAreaUl = document.querySelector("#weather-area ul");
  weatherHTML = weatherStuff.join("");
  weatherAreaUl.innerHTML = weatherHTML
}

function onBodyLoad() {
  let countryCodes = `AALAND ISLANDS: AX
AFGHANISTAN: AF
ALBANIA: AL
ALGERIA: DZ
AMERICAN SAMOA: AS
ANDORRA: AD
ANGOLA: AO
ANGUILLA: AI
ANTARCTICA: AQ
ANTIGUA AND BARBUDA: AG
ARGENTINA: AR
ARMENIA: AM
ARUBA: AW
AUSTRALIA: AU
AUSTRIA: AT
AZERBAIJAN: AZ
BAHAMAS: BS
BAHRAIN: BH
BANGLADESH: BD
BARBADOS: BB
BELARUS: BY
BELGIUM: BE
BELIZE: BZ
BENIN: BJ
BERMUDA: BM
BHUTAN: BT
BOLIVIA: BO
BOSNIA AND HERZEGOWINA:BA
BOTSWANA: BW
BOUVET ISLAND: BV
BRAZIL: BR
BRITISH INDIAN OCEAN TERRITORY: IO
BRUNEI DARUSSALAM: BN
BULGARIA: BG
BURKINA FASO: BF
BURUNDI: BI
CAMBODIA: KH
CAMEROON: CM
CANADA: CA
CAPE VERDE: CV
CAYMAN ISLANDS: KY
CENTRAL AFRICAN REPUBLIC: CF
CHAD: TD
CHILE: CL
CHINA: CN
CHRISTMAS ISLAND: CX
COCOS (KEELING) ISLANDS: CC
COLOMBIA: CO
COMOROS: KM
CONGO, Democratic Republic of (was Zaire): CD
CONGO, Republic of: CG
COOK ISLANDS: CK
COSTA RICA: CR
COTE D'IVOIRE: CI
CROATIA (local name: Hrvatska): HR
CUBA: CU
CYPRUS: CY
CZECH REPUBLIC: CZ
DENMARK: DK
DJIBOUTI: DJ
DOMINICA: DM
DOMINICAN REPUBLIC: DO
ECUADOR: EC
EGYPT: EG
EL SALVADOR: SV
EQUATORIAL GUINEA: GQ
ERITREA: ER
ESTONIA: EE
ETHIOPIA: ET
FALKLAND ISLANDS (MALVINAS): FK
FAROE ISLANDS: FO
FIJI: FJ
FINLAND: FI
FRANCE: FR
FRENCH GUIANA: GF
FRENCH POLYNESIA: PF
FRENCH SOUTHERN TERRITORIES: TF
GABON: GA
GAMBIA: GM
GEORGIA: GE
GERMANY: DE
GHANA: GH
GIBRALTAR: GI
GREECE: GR
GREENLAND: GL
GRENADA: GD
GUADELOUPE: GP
GUAM: GU
GUATEMALA: GT
GUINEA: GN
GUINEA-BISSAU: GW
GUYANA: GY
HAITI: HT
HEARD AND MC DONALD ISLANDS: HM
HONDURAS: HN
HONG KONG: HK
HUNGARY: HU
ICELAND: IS
INDIA: IN
INDONESIA: ID
IRAN (ISLAMIC REPUBLIC OF): IR
IRAQ: IQ
IRELAND: IE
ISRAEL: IL
ITALY: IT
JAMAICA: JM
JAPAN: JP
JORDAN: JO
KAZAKHSTAN: KZ
KENYA: KE
KIRIBATI: KI
KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF: KP
KOREA, REPUBLIC OF: KR
KUWAIT: KW
KYRGYZSTAN: KG
LAO PEOPLE'S DEMOCRATIC REPUBLIC: LA
LATVIA: LV
LEBANON: LB
LESOTHO: LS
LIBERIA: LR
LIBYAN ARAB JAMAHIRIYA: LY
LIECHTENSTEIN: LI
LITHUANIA: LT
LUXEMBOURG: LU
MACAU: MO
MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF: MK
MADAGASCAR: MG
MALAWI: MW
MALAYSIA: MY
MALDIVES: MV
MALI: ML
MALTA: MT
MARSHALL ISLANDS: MH
MARTINIQUE: MQ
MAURITANIA: MR
MAURITIUS: MU
MAYOTTE: YT
MEXICO: MX
MICRONESIA, FEDERATED STATES OF: FM
MOLDOVA, REPUBLIC OF: MD
MONACO: MC
MONGOLIA: MN
MONTSERRAT: MS
MOROCCO: MA
MOZAMBIQUE: MZ
MYANMAR: MM
NAMIBIA: NA
NAURU: NR
NEPAL: NP
NETHERLANDS: NL
NETHERLANDS ANTILLES: AN
NEW CALEDONIA: NC
NEW ZEALAND: NZ
NICARAGUA: NI
NIGER: NE
NIGERIA: NG
NIUE: NU
NORFOLK ISLAND: NF
NORTHERN MARIANA ISLANDS: MP
NORWAY: NO
OMAN: OM
PAKISTAN: PK
PALAU: PW
PALESTINIAN TERRITORY, Occupied: PS
PANAMA: PA
PAPUA NEW GUINEA: PG
PARAGUAY: PY
PERU: PE
PHILIPPINES: PH
PITCAIRN: PN
POLAND: PL
PORTUGAL: PT
PUERTO RICO: PR
QATAR: QA
REUNION: RE
ROMANIA: RO
RUSSIAN FEDERATION: RU
RWANDA: RW
SAINT HELENA: SH
SAINT KITTS AND NEVIS: KN
SAINT LUCIA: LC
SAINT PIERRE AND MIQUELON: PM
SAINT VINCENT AND THE GRENADINES: VC
SAMOA: WS
SAN MARINO: SM
SAO TOME AND PRINCIPE: ST
SAUDI ARABIA: SA
SENEGAL: SN
SERBIA AND MONTENEGRO: CS
SEYCHELLES: SC
SIERRA LEONE: SL
SINGAPORE: SG
SLOVAKIA: SK
SLOVENIA: SI
SOLOMON ISLANDS: SB
SOMALIA: SO
SOUTH AFRICA: ZA
SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS: GS
SPAIN: ES
SRI LANKA: LK
SUDAN: SD
SURINAME: SR
SVALBARD AND JAN MAYEN ISLANDS: SJ
SWAZILAND: SZ
SWEDEN: SE
SWITZERLAND: CH
SYRIAN ARAB REPUBLIC: SY
TAIWAN: TW
TAJIKISTAN: TJ
TANZANIA, UNITED REPUBLIC OF: TZ
THAILAND: TH
TIMOR-LESTE: TL
TOGO: TG
TOKELAU: TK
TONGA: TO
TRINIDAD AND TOBAGO: TT
TUNISIA: TN
TURKEY: TR
TURKMENISTAN: TM
TURKS AND CAICOS ISLANDS: TC
TUVALU: TV
UGANDA: UG
UKRAINE: UA
UNITED ARAB EMIRATES: AE
UNITED KINGDOM: GB
UNITED STATES: US
UNITED STATES MINOR OUTLYING ISLANDS: UM
URUGUAY: UY
UZBEKISTAN: UZ
VANUATU: VU
VATICAN CITY STATE (HOLY SEE): VA
VENEZUELA: VE
VIET NAM: VN
VIRGIN ISLANDS (BRITISH): VG
VIRGIN ISLANDS (U.S.): VI
WALLIS AND FUTUNA ISLANDS: WF
WESTERN SAHARA: EH
YEMEN: YE
ZAMBIA: ZM
ZIMBABWE: ZW`

  let eachCountry = countryCodes.split("\n").map(country => country.split(": ")).map((option) => {
    if (option[0] === "UNITED STATES"){
      return `<option value="${option[1]}" selected="selected">${option[0]}</option>`
    } else {
      return `<option value="${option[1]}">${option[0]}</option>`
    }
  });

  let countries = document.querySelector("#countries");
  countries.innerHTML = eachCountry;
}
