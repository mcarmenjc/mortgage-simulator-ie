function emptyRepaymentsInfo(){
    let $repaymentsInfo = $('#repaymentsInfo');
    $repaymentsInfo.empty();
}

function showRepaymentsInfo(mortgage){
    let $repaymentsInfo = $('#repaymentsInfo');
    $repaymentsInfo.append(
        $('<ul class="list-group"></ul').append(
            createListEntry('Total amount to pay', mortgage.totalAmount.toFixed(2))
        ).append(
            createListEntry('Total interests to pay', mortgage.totalInterests.toFixed(2))
        )
    );
}