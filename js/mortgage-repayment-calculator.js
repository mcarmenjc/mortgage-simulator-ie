function getMortgageHouseInfo(housePrice, preapprovedAmount, eligibleForHTB){
    let houseInfo = {
        'deposit': 0,
        'mortgageAmount': 0,
        'LTV': 0,
        'HTBAmount': 0
    };
    houseInfo.deposit = (housePrice*0.1) < (housePrice - preapprovedAmount) ? (housePrice - preapprovedAmount) : (housePrice*0.1);
    houseInfo.mortgageAmount = housePrice - houseInfo.deposit;
    houseInfo.LTV = houseInfo.mortgageAmount*100/housePrice;
    if (eligibleForHTB){
        houseInfo.HTBAmount = housePrice*0.05 > 20000 ? 20000 : housePrice*0.05;
    }

    return houseInfo;
}

function calculateMortgage(houseInfo, bankInfo, fixedYears, totalYears){
    let mortgage = {
        'repaymentInfo': {},
        'totalAmount': 0,
        'totalInterests': 0
    };

    mortgage.repaymentInfo = calculateMortgageRepayment(houseInfo, bankInfo.fixed[fixedYears], bankInfo.variable, totalYears);
    mortgage.totalAmount = mortgage.repaymentInfo.fixed.monthlyRepayment*fixedYears*12 + mortgage.repaymentInfo.variable.monthlyRepayment*(totalYears-fixedYears)*12;
    mortgage.totalInterests = mortgage.totalAmount - houseInfo.mortgageAmount;

    return mortgage;
}

function calculateMortgageRepayment(houseInfo, fixedRateInfo, variableRateInfo, totalYears){
    let repayment = {
        'fixed': {},
        'variable': {}
    };

    repayment.fixed = calculateRepaymentForRate(houseInfo, fixedRateInfo, totalYears);
    repayment.variable = calculateRepaymentForRate(houseInfo, variableRateInfo, totalYears);

    return repayment;
}

function calculateRepaymentForRate(houseInfo, rateInfo, totalYears){
    var repayment = {
        'rate': 0,
        'APRC': 0,
        'monthlyRepayment': 0
    };

    Object.keys(rateInfo).forEach(function(percentage){
        let [lower, upper] = percentage.split('-');
        if (houseInfo.LTV > parseInt(lower) && houseInfo.LTV <= parseInt(upper)){
            repayment.rate = rateInfo[percentage].interest;
            repayment.APRC = rateInfo[percentage].APRC;
            repayment.monthlyRepayment = calculateRepayment(houseInfo.mortgageAmount, rateInfo[percentage].interest, totalYears);
        }
    });

    return repayment;
}

function calculateRepayment(mortgageAmount, rate, totalYears){
    let monthlyRate = rate/12/100;
    let numMonths = totalYears*12;
    let magicOperand = Math.pow((1 + monthlyRate), numMonths);
    let monthlyRepayment = mortgageAmount * (monthlyRate*magicOperand/(magicOperand - 1));
    return monthlyRepayment;
}