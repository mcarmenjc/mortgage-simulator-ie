function getMortgageHouseInfo(housePrice, preapprovedAmount, eligibleForHTB){
    let houseInfo = {
        'deposit': 0,
        'mortgageAmount': 0,
        'LTV': 0,
        'HTBAmount': 0,
        'totalPrice': housePrice
    };
    houseInfo.deposit = (housePrice*0.1) < (housePrice - preapprovedAmount) ? (housePrice - preapprovedAmount) : (housePrice*0.1);
    houseInfo.mortgageAmount = housePrice - houseInfo.deposit;
    houseInfo.LTV = houseInfo.mortgageAmount*100/housePrice;
    if (eligibleForHTB){
        houseInfo.HTBAmount = housePrice*0.05 > 20000 ? 20000 : housePrice*0.05;
    }

    return houseInfo;
}

function calculateMortgage(houseInfo, bankInfo, fixedYears, totalYears, overpayments){
    let mortgage = {
        'repayments': [],
        'totalAmount': 0,
        'totalInterests': 0
    };

    mortgage.repayments = calculateMortgageRepayment(houseInfo, bankInfo, fixedYears, totalYears, overpayments);
    mortgage.totalAmount = 0;
    mortgage.totalInterests = 0;
    mortgage.repayments.forEach(function(repay){
        mortgage.totalAmount += repay.monthlyRepayment * (repay.to - repay.from + 1);
        mortgage.totalInterests += repay.interestPaid * (repay.to - repay.from + 1);
    });

    return mortgage;
}

function calculateMortgageRepayment(houseInfo, bankInfo, fixedYears, totalYears, overpayments){
    let repayment = [];

    let fixedRepayment = calculateRepaymentForRate(houseInfo.mortgageAmount, houseInfo.LTV, bankInfo.fixed[fixedYears], totalYears);
    fixedRepayment.from = 1;
    fixedRepayment.to = fixedYears*12;
    fixedRepayment.overpayment = 0;
    repayment.push(fixedRepayment);
    
    let variableRepayment = calculateRepaymentForRate(houseInfo.mortgageAmount, houseInfo.LTV, bankInfo.variable, totalYears);
    variableRepayment.from = fixedYears*12 + 1;
    variableRepayment.overpayment = 0;

    let newMortgageAmount = houseInfo.mortgageAmount;
    let newLTV = houseInfo.LTV;

    Object.keys(overpayments).sort((a, b) => { return a-b }).forEach(function(month){
        if (month > fixedYears*12 + 1){
            variableRepayment.to = month - 1;
            repayment.push(variableRepayment);

            newMortgageAmount = newMortgageAmount - overpayments[month];
            newLTV = newMortgageAmount*100/houseInfo.totalPrice;
            variableRepayment = calculateRepaymentForRate(newMortgageAmount, newLTV, bankInfo.variable, totalYears);
            variableRepayment.overpayment = overpayments[month];
            variableRepayment.from = month;
        }
    });

    variableRepayment.to = totalYears*12;
    repayment.push(variableRepayment);

    return repayment;
}

function calculateRepaymentForRate(mortgageAmount, LTV, rateInfo, totalYears){
    var repayment = {
        'rate': 0,
        'APRC': 0,
        'monthlyRepayment': 0,
        'interestPaid': 0,
        'totalAmount': mortgageAmount
    };

    Object.keys(rateInfo).forEach(function(percentage){
        let [lower, upper] = percentage.split('-');
        if (LTV > parseInt(lower) && LTV <= parseInt(upper)){
            repayment.rate = rateInfo[percentage].interest;
            repayment.APRC = rateInfo[percentage].APRC;
            repayment.monthlyRepayment = calculateRepayment(mortgageAmount, rateInfo[percentage].interest, totalYears);
            repayment.interestPaid = repayment.monthlyRepayment - (mortgageAmount/totalYears/12);
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