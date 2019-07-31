function emptyHouseInfo(){
    let $houseInfo = $('#mortgageHouseInfo');
    $houseInfo.empty();
}

function createListEntry(text, value){
    let $entry = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>').text(text).append(
        $('<span class="badge badge-primary badge-pill ml-4"></span>').text(value)
    );

    return $entry;
}

function showHouseInfo(houseInfo){
    let $houseInfo = $('#mortgageHouseInfo');
    $houseInfo.append(
        $('<ul class="list-group"></ul').append(
            createListEntry('Deposit', houseInfo.deposit)
        ).append(
            createListEntry('Mortgage amount', houseInfo.mortgageAmount)
        ).append(
            createListEntry('LTV', houseInfo.LTV)
        ).append(
            createListEntry('Help to Buy amount', houseInfo.HTBAmount.toFixed(2))
        )
    );
}