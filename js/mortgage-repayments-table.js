function emptyRepaymentsTable(){
    let $repaymentsTable = $('#repaymentsTable');
    $repaymentsTable.empty();
}

function showRepaymentsTable(mortgage, houseInfo, fixedYears, totalYears){
    let $repaymentsTable = $('#repaymentsTable');
    let $data = $('<tbody></tbody>');

    let noInterestRepayment = houseInfo.mortgageAmount/(totalYears*12);
    let balance = houseInfo.mortgageAmount;

    for (let i = 1; i <= totalYears*12; i++){
        let $row = $('<tr></tr>').append(
            $('<th scope="row"></th>').text(i)
        );
        let rate = mortgage.repaymentInfo.variable.rate;
        let repayment = mortgage.repaymentInfo.variable.monthlyRepayment;
        
        if(i <= fixedYears*12){
            rate = mortgage.repaymentInfo.fixed.rate;
            repayment = mortgage.repaymentInfo.fixed.monthlyRepayment;
        }

        let interestPaid = repayment - noInterestRepayment;
        balance = balance - noInterestRepayment;

        $row.append(
            $('<td></td>').text(rate)
        );
        $row.append(
            $('<td></td>').text(interestPaid.toFixed(2))
        );
        $row.append(
            $('<td></td>').text(repayment.toFixed(2))
        );
        $row.append(
            $('<td></td>').text(balance.toFixed(2))
        );
        
        $data.append($row);
    }

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
                $('<th scope="col"></th>').text('balance')
            )
        )
    ).append($data);

    $repaymentsTable.append($table);
}