'use strict'
export let localization
export let controller = new AbortController()
export const lang = document.getElementsByTagName('html')[0].getAttribute('lang')
if (lang === "ru") {
    localization = {
        soldOutImage: "sold_out.png",
        scrollTop: "Наверх",
        price: "Цена",
        lowestPrice: "Минимальная цена",
        from: "из",
        other: "Другие",
        myBalance: "Мой баланс",
        noYoutube: "Нет видео из Youtube",
        momentMint: "Всего моментов",
        streamer: "Стример",
        depositText: "Недостаточно средств на балансе",
        deposit: "Пополнить",
        buyFor: "Купить за",
        Twitch: "Twitch",
        Youtube: "Youtube",
        GGBox: "NFT BOX®",
        currentPrice: "Текущая цена",
        created: "Создан",
        buy: "Купить",
        include: "Включает",
        moments: "момента",
        total: "NFT BOX®",
        buyDrop: "Купить",
        dropEnd: "Все продано",
        viewDrop: "Перейти",
        noTwitchClip: "Нет клипа с Twitch((",
        noInnerVideo: "Нет момента",
        selectSource: "Посмотреть момент",
        noActiveLots: "Никто не продаёт этот момент",
        dayAgo: "день назад",
        someDaysAgo: "дня назад",
        manyDaysAgo: "дней назад",
        today: "сегодня",
        by: "от",
        fieldRequired: "Это поле обязательно для заполнения",
        minSign: "Минимальное число символов - ",
        emailIncorrect: "Почта указана неверно",
        maxSign: "Максимальное число символов - ",
        passwordRegExp: "Пароль должен содержать хотя бы одну заглавную и прописную латинскую букву и одну цифру",
        passwordNotEqual: "Пароли не совпадают",
        acceptTOS: "Примите соглашения для регистрации",
        acceptPolicy: "Дайте согласие на обработку персональных данных",
        selectAmount: "Введите сумму",
        minAmount: "Минимальная сумма -",
        payoutError: "Ошибка при отправке запроса на платеж. Попробуйте позже.",
        currency: "$",
        putOnSaleBtn: "Продать",
        noItems: "В данном разделе нет моментов",
        nextBox: "Далее",
        openMore: "Открыть еще NFT BOX®",
        noBoxes: "Нет NFT BOX®",
        setPrice: "Выставить цену на момент",
        sellFor: "Продать за",
        totalSellPrice: "С учетом комиссии 5%",
        cancelSale: "Снять",
        withdrawMoment: "Снять момент с продажи",
        wannaWithdrawMoment: "Вы точно хотите снять момент с продажи?",
        lotCreated: "Момент успешно выставлен на продажу",
        cannotBuyFromYourself: "Вы не можете купить момент у самого себя",
        maxAmount: "Максимальная цена $1000000",
        manyDaysSoon: "дней",
        daySoon: "день",
        someDaysSoon: "дня",
        in: "через",
        released: "уже вышел",
        willBeAvailable:"будет доступен",
    }
} else if (lang === "en") {
    localization = {
        willBeAvailable:"will be available",
        released: "now available",
        soldOutImage: "sold_out.png",
        scrollTop: "Scroll up",
        price: "Price",
        lowestPrice: "Initial price",
        from: "from",
        myBalance: "My balance",
        noYoutube: "No video from youtube",
        momentMint: "Total moments",
        streamer: "Streamer",
        depositText: "Not enough money on balance",
        deposit: "Deposit",
        buyFor: "Buy for",
        Twitch: "Twitch",
        Youtube: "Youtube",
        GGBox: "NFT BOX®",
        currentPrice: "Current price",
        created: "Created",
        buy: "Buy",
        include: "Include",
        moments: "moments",
        total: "NFT BOX®",
        buyDrop: "Buy",
        dropEnd: "Drop end",
        viewDrop: "View NFT BOX®",
        noTwitchClip: "No clips from Twitch((",
        noInnerVideo: "NO moments",
        selectSource: "Select source",
        noActiveLots: "No active lots",
        dayAgo: "day ago",
        someDaysAgo: "days ago",
        manyDaysAgo: "days ago",
        today: "today",
        other: "other",
        by: "by",
        fieldRequired: "This field is required",
        minSign: "Minimum signs - ",
        emailIncorrect: "Email incorrect",
        maxSign: "Maximum signs - ",
        passwordRegExp: "The password must contain at least one upper and lower Latin letter and one digit",
        passwordNotEqual: "Password not equal",
        acceptTOS: "Please, accept TOS",
        acceptPolicy: "Please, accept privacy policy",
        minAmount: "Minimum amount -",
        payoutError: "Payout request error. Please, try again later.",
        currency: "$",
        putOnSaleBtn: "Sale",
        noItems: "No any moments here",
        nextBox: "Next",
        openMore: "Open more NFT BOX®",
        noBoxes: "No more NFT BOX®",
        setPrice: "Set price for moment",
        sellFor: "Sell for ",
        totalSellPrice: "With commission you receive -5% commission",
        cancelSale: "Withdraw",
        withdrawMoment: "Withdraw moment from sale",
        wannaWithdrawMoment: "Do you want to remove a moment from sale?",
        lotCreated: "Lot created successfully",
        cannotBuyFromYourself: "You cannot buy moment by yourself",
        maxAmount: "Max amount is $1000000",
        daySoon: "day",
        someDaysSoon: "days",
        manyDaysSoon: "days",
        in: "in"
    }
}
export const gameCode = new Map([
    ["*", 0],
    [".1", 1],
    [".3", 3],
    [".4", 4],
    [".5", 5],
    [".6", 6],
    ["collectable", 1],
    ["created", 2]
])
export const localizationCategory = new Map([
    ["dota2",1],
    ["lol", 3],
    ["csgo", 4],
    ["warzone",5],
    [localization.other,6]
]
)


export const activeStyle = {
    'border-bottom': '2px solid blueviolet',
    'background-color': 'rgba(80,80,80,0.2)',
}
export const deActiveStyle = {
    'border-bottom': '2px solid rgba(80,80,80,0.2)',
    'background-color': 'inherit',
}
export const $window = $(window)
