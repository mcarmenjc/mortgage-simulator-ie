let overpayments = {};

function getFormData(){
    let housePrice = parseInt($('#housePriceInput').val());
    let preapprovedAmount = parseInt($('#mortgagePreapprovedAmountInput').val());
    let bank = $('#banksSelect').val();
    let fixedRateYears = parseInt($('#numYearsFixedRateSelect').val());
    let numYears = parseInt($('#mortgageYearsSelect').val());
    let isEligibleForHTB = $('#helpToBuyCheckbox').prop('checked');

    return [housePrice, preapprovedAmount, bank, fixedRateYears, numYears, isEligibleForHTB];
}

function removeValidationClass($elem){
    $elem.removeClass('is-valid');
    $elem.removeClass('is-invalid');
}

function validateForm(){
    let isValid = true;
    let $housePrice = $('#housePriceInput');
    let $preapprovedAmount = $('#mortgagePreapprovedAmountInput');

    removeValidationClass($housePrice);
    removeValidationClass($preapprovedAmount);

    if($housePrice.val() !== undefined && $housePrice.val() !== "" && parseInt($housePrice.val()) > 0){
        $housePrice.addClass('is-valid');
    }
    else{
        isValid = false;
        $housePrice.addClass('is-invalid');
    }

    if($preapprovedAmount.val() !== undefined && $preapprovedAmount.val() !== "" && parseInt($preapprovedAmount.val()) > 0){
        $preapprovedAmount.addClass('is-valid');
    }
    else{
        isValid = false;
        $preapprovedAmount.addClass('is-invalid');
    }

    return isValid;
}

function validateOverpayment(){
    let isValid = true;
    let $overpaymentMonth = $('#overpaymentMonthInput');
    let $overpaymentAmount = $('#overpaymentAmountInput');

    removeValidationClass($overpaymentMonth);
    removeValidationClass($overpaymentAmount);

    if($overpaymentMonth.val() === undefined || $overpaymentMonth.val() === "" || parseInt($overpaymentMonth.val()) <= 0 || overpayments.hasOwnProperty(parseInt($overpaymentMonth.val()))){
        isValid = false;
        $overpaymentMonth.addClass('is-invalid');
    }

    if($overpaymentAmount.val() === undefined || $overpaymentAmount.val() === "" || parseInt($overpaymentAmount.val()) <= 0){
        isValid = false;
        $overpaymentAmount.addClass('is-invalid');
    }

    return isValid;
}

function addOverpaymentToTable(){
    let $table = $('#overpayments').find('tbody');
    let month = $('#overpaymentMonthInput').val();
    let amount = $('#overpaymentAmountInput').val();
    $table.append(
        $('<tr></tr>').append(
            $('<th scope="row"></th>').text(month)
        ).append(
            $('<td></td>').text(amount)
        )
    );
}

function cleanOverpaymentMiniForm(){
    let $overpaymentMonth = $('#overpaymentMonthInput');
    let $overpaymentAmount = $('#overpaymentAmountInput');
    $overpaymentAmount.val('');
    $overpaymentMonth.val('');
}

function addOverpayment(){
    let month = parseInt($('#overpaymentMonthInput').val());
    let amount = parseInt($('#overpaymentAmountInput').val());

    overpayments[month] = amount;
}

$(document).ready(function(){
    let $calculateButton = $('#calculateButton');
    $calculateButton.click(function(event){
        event.stopPropagation();
        emptyHouseInfo();
        emptyRepaymentsInfo();
        emptyRepaymentsTable();
        let isValid = validateForm();
        if (isValid){
            let [housePrice, preapprovedAmount, bank, fixedRateYears, numYears, isEligibleForHTB] = getFormData();
            let houseInfo = getMortgageHouseInfo(housePrice, preapprovedAmount, isEligibleForHTB);
            showHouseInfo(houseInfo);

            let banks = banksInfo();
            let mortgage = calculateMortgage(houseInfo, banks[bank], fixedRateYears, numYears, overpayments);
            showRepaymentsInfo(mortgage);
            showRepaymentsTable(mortgage.repayments, houseInfo.mortgageAmount);
        }
    });

    let $addButton = $('#addOverpaymentButton');
    $addButton.click(function(event){
        event.stopPropagation();
        let isValid = validateOverpayment();
        if(isValid){
            addOverpayment();
            addOverpaymentToTable();
            cleanOverpaymentMiniForm();
        }
    });
});