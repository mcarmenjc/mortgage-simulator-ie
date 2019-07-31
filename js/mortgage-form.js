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

$(document).ready(function(){
    let $calculateButton = $('#calculateButton');
    $calculateButton.click(function(event){
        console.log('button clicked');
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
            let mortgage = calculateMortgage(houseInfo, banks[bank], fixedRateYears, numYears);
            showRepaymentsInfo(mortgage);
            showRepaymentsTable(mortgage, houseInfo, fixedRateYears, numYears);
        }
    });
});