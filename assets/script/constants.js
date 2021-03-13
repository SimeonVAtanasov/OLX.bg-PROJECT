const indexPage = getById("indexPage");
const adsContainer = getById("noticePage");
const errorPage = getById("errorPage");
const myAdsPage = getById("myAdsPage")
const singleNoticeContainer = getById("singleNoticeContainer");
const searchForm = getById("searchForm");
const profilePage = getById("profilePage");
const addAdvertisementPage = getById("addAdvertisementPage");
const promoContainer = getById("promoAdsContainer");
const seeAllBtn = getById("seeAll");

const adsManager = new AdvertisementManager();

const noticeContainer = getById("noticeContainer");
const loginBtn = getById("navLoginBtn");
const registrationBtn = getById("navRegistrationBtn");
const navbar = document.getElementById("header");
const advertismentBtn = getById("advertisementButton");
const noticeWrapper = getById("noticeWrapper");
const noticePromoContainer = getById("noticePromoContainer");
const noticeUserInformation = getById("userInformationWrapper");


const loginForm = getById("loginForm");
const registrationForm = getById("registrationForm");

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

const googlePlay = getById("googlePlay");
const appStore = getById("appStore");
const appGalerry = getById("appGalerry");
const downloadText = getById("downloadText");
const downloadFrom = getById("downloadFromText");

const boxesToChangeText = [googlePlay, appStore, appGalerry];

// registration and login
const registerForm = getById("registrationForm")

const emailRegisterInput = getById("registerEmail");
const passwordRegisterInput = getById("registerPassword");
const emailLoginInput = getById("logEmail");
const passwordLoginInput = getById("loginPassword");

const emailRegMessage = getById("emailRegError");
const passwordRegMessage = getById("passwordRegError");

const emailLogMessage = getById("emailLogError");
const passwordLogMessage = getById("passwordLogError");



const adTitleInput = getById("adTitle");
const adDescriptionInput = getById("adDescription");
const adCityInput = getById("contactsCity");
const adNumberInput = getById("contactsNumber");
const inputsToFocus = [adTitleInput, adDescriptionInput, adCityInput, adNumberInput];

const categoryBtn = getById("categoryBox");

const preview = getById("noticeImg");

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

