//Формулы взяты из JuniperBot

//Расчёт опыта для получаения нового уровня
exports.getLevelExp = getLevelExp;
async function getLevelExp(Level) {
    return (5 * (Level * Level) + (50 * Level) + 100);
    //return (Level * Level) * 100 + 100 // old func
}

//Расчёт всего опыта по уровню
exports.getLevelTotalExp = getLevelTotalExp;
async function getLevelTotalExp(Level) {
    let Exp = 0;
    for (var i = 0; i < Level; i++) {
        Exp + getLevelExp(i);
    }

    return Exp;
}

//
exports.getLevelFromExp = getLevelFromExp;
async function getLevelFromExp(Exp) {
    let Level = 0;
    while (Exp >= getLevelExp(Level)) {
        Exp -= getLevelExp(Level);
        Level++;
    }
    return Level;
}


//Всего опыта
exports.getRemainingExp = getRemainingExp;
async function getRemainingExp(TotalExp) {
    let Remaining = TotalExp;
    for (var i = 0; i < getLevelFromExp(TotalExp); i++) {
        Remaining - getLevelExp(i);
    }

    return Remaining;
}