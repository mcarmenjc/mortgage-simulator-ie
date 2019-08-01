function emptyRepaymentsTable(){
    let $repaymentsTable = $('#repaymentsTable');
    $repaymentsTable.empty();
}

function showRepaymentsTable(repayments, mortgageAmount){
    let $repaymentsTable = $('#repaymentsTable');
    let $data = $('<tbody></tbody>');
    let balance = mortgageAmount;

    repayments.forEach((repayInfo) => {
        for(let i = repayInfo.from; i <= repayInfo.to; i++){
            let $row = $('<tr></tr>').append(
                $('<th scope="row"></th>').text(i)
            );

            let overpayment = 0;
            if(i === repayInfo.from){
                overpayment = repayInfo.overpayment;
            }
            balance = balance - (repayInfo.monthlyRepayment - repayInfo.interestPaid) - overpayment;

            $row.append(
                $('<td></td>').text(repayInfo.rate)
            ).append(
                $('<td></td>').text(repayInfo.interestPaid.toFix(2))
            ).append(
                $('<td></td>').text(repayInfo.monthlyRepayment.toFix(2))
            ).append(
                $('<td></td>').text(overpayment.toFix(2))
            ).append(
                $('<td></td>').text(balance.toFix(2))
            );
        }
    });

    let $table = $('<table class="table table-striped"></table>').append(
        $('<thead class="thead-dark"></thead>').append(
            $('<tr></tr>').append(
                $('<th scope="col"></th>').text('#')
            ).append(
                $('<th scope="col"></th>').text('Interest rate')
            ).append(
                $('<th scope="col"></th>').text('Interest paid')
            ).append(
                $('<th scope="col"></th>').text('Installment')
            ).append(
                $('<th scope="col"></th>').text('Overpayment')
            ).append(
                $('<th scope="col"></th>').text('balance')
            )
        )
    ).append($data);

    $repaymentsTable.append($table);
}