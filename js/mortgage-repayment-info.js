function emptyRepaymentsInfo(){
    let $repaymentsInfo = $('#repaymentsInfo');
    $repaymentsInfo.empty();
}

function showRepaymentInfo(repayment){
    let $rateInfo = $('<ul class="list-group list-group-horizontal"></ul').append(
        createListEntry('Rate', repayment.rate)
    ).append(
        createListEntry('APRC', repayment.APRC)
    ).append(
        createListEntry('Monthly amount', repayment.monthlyRepayment.toFixed(2))
    );

    return $rateInfo;
}

function showRepaymentsInfo(mortgage){
    let $repaymentsInfo = $('#repaymentsInfo');
    $repaymentsInfo.append(
        $('<ul class="list-group"></ul').append(
            $('<li class="list-group-item"></li>').text('Fixed').append(
                showRepaymentInfo(mortgage.repaymentInfo.fixed)
            )
        ).append(
            $('<li class="list-group-item"></li>').text('Variable').append(
                showRepaymentInfo(mortgage.repaymentInfo.variable)
            )
        ).append(
            createListEntry('Total amount', mortgage.totalAmount.toFixed(2))
        ).append(
            createListEntry('Total interests', mortgage.totalInterests.toFixed(2))
        )
    );
}