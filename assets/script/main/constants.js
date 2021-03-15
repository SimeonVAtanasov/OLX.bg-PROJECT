//Pages
const indexPage = getById("indexPage");
const errorPage = getById("errorPage");
const adsContainer = getById("noticePage");
const myAdsPage = getById("myAdsPage");
const profilePage = getById("profilePage");
const addAdvertisementPage = getById("addAdvertisementPage");
const likeAdsPage = getById("likedAdsPage");

//Forms
const searchForm = getById("searchForm");
const loginForm = getById("loginForm");
const registrationForm = getById("registrationForm");

//Conainers 
const singleNoticeContainer = getById("singleNoticeContainer");
const promoContainer = getById("promoAdsContainer");
const noticeContainer = getById("noticeContainer");
const noticeWrapper = getById("noticeWrapper");
const noticePromoContainer = getById("noticePromoContainer");
const noticeUserInformation = getById("userInformationWrapper");
const categoriesContainer = getById("categoriesContainer");
const categoriesFormContainer = getById("addCategories");
const divBox  =  document.getElementById('suggestion');

//Buttons
const seeAllBtn = getById("seeAll");
const loginBtn = getById("navLoginBtn");
const registrationBtn = getById("navRegistrationBtn");
const advertismentBtn = getById("advertisementButton");
const categoryBtn = getById("categoryBox");

//Inputs
const emailRegisterInput = getById("registerEmail");
const passwordRegisterInput = getById("registerPassword");
const emailLoginInput = getById("logEmail");
const passwordLoginInput = getById("loginPassword");
const adTitleInput = getById("adTitle");
const adDescriptionInput = getById("adDescription");
const adCityInput = getById("contactsCity");
const adNumberInput = getById("contactsNumber");
const inputsToFocus = [adTitleInput, adDescriptionInput, adCityInput, adNumberInput];

// SearchBar elements
const searchContainer = getById("searchContainer");
const searchBar = getById("searchInput");
const citySearch = getById("citySearch");
const searchButton = getById("submitSearch");

//Profile Menu elements
const profileMenu = getById("profileMenu");
const profileDropdown = getById("profileDropdown");
const dropdownArrow = getById("arrow");
const profileUsername = getById("userName");
const logOut = getById("log-out");

//Footer icons
const googlePlay = getById("googlePlay");
const appStore = getById("appStore");
const appGalerry = getById("appGalerry");
const downloadText = getById("downloadText");
const downloadFrom = getById("downloadFromText");
const boxesToChangeText = [googlePlay, appStore, appGalerry];


//Error messages
const emailRegMessage = getById("emailRegError");
const passwordRegMessage = getById("passwordRegError");
const emailLogMessage = getById("emailLogError");
const passwordLogMessage = getById("passwordLogError");


//  messages  in add notice form
const suggestMessageTitle = getById("suggestMessageTitle");
const suggestMessageDescription = getById("suggestMessageDescription");
const suggestMessageCity = getById("suggestMessageCity");
const suggestMessageNumber = getById("suggestMessageNumber");


// grid   and bars btns
const grid = getById("grid");
const bars =  getById("bars");

// filters
const categoryFilter = getById("categoryFilter");
const sort = getById("sorting");


const adsManager = new AdvertisementManager();
const navbar = document.getElementById("header");
const preview = getById("noticeImg");
