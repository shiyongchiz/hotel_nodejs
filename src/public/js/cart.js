var check = false;
var quantity = {}

function changeVal(el) {
    var qt = parseFloat(el.parent().children(".qt").html());
    var price = parseFloat(el.parent().children(".price").html());
    var eq = Math.round(price * qt * 100) / 100;

    el.parent().children(".full-price").html(eq + "$");

    changeTotal();
}

function changeTotal() {

    var price = 0;

    $(".full-price").each(function (index) {
        price += parseFloat($(".full-price").eq(index).html());
    });

    price = Math.round(price * 100) / 100;
    var tax = Math.round(price * 0.05 * 100) / 100
    var fullPrice = Math.round((price + tax) * 100) / 100;

    if (price == 0) {
        fullPrice = 0;
    }

    $(".subtotal span").html(price);
    $(".tax span").html(tax);
    $(".total span").html(fullPrice);
}

$(document).ready(function () {

    $(".remove").click(function () {
        var el = $(this);
        var id = $(this).attr('id')
        quantity[id] = false
        el.parent().parent().addClass("removed");
        window.setTimeout(
            function () {
                el.parent().parent().slideUp('fast', function () {
                    el.parent().parent().remove();
                    if ($(".product").length == 0) {
                        if (check) {
                            $("#cart").html("<h1>your order is pending</h1><a class='nav-link' href='/order'>click here to see your order<a>");
                        } else {
                            $("#cart").html("<h1>No products!</h1>");
                        }
                    }
                    changeTotal();
                });
            }, 200);
    });

    $(".qt-plus").click(function () {
        $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1);
        var id = $(this).parent().children(".qt").attr('id')
        quantity[id] += 1
        $(this).parent().children(".full-price").addClass("added");

        var el = $(this);
        window.setTimeout(function () { el.parent().children(".full-price").removeClass("added"); changeVal(el); }, 150);
    });

    $(".qt-minus").click(function () {

        child = $(this).parent().children(".qt");

        if (parseInt(child.html()) > 1) {
            child.html(parseInt(child.html()) - 1);
            var id = $(this).parent().children(".qt").attr('id')
            quantity[id] -= 1
        }
       
        $(this).parent().children(".full-price").addClass("minused");

        var el = $(this);
        window.setTimeout(function () { el.parent().children(".full-price").removeClass("minused"); changeVal(el); }, 150);
    });

    window.setTimeout(function () { $(".is-open").removeClass("is-open") }, 1200);

    $(".btn").click(function () {
        check = true;
        var total = $(".total span").text();
        var userId = $("#userId").val();
        $.post('/cart/checkout', {
            total, userId, quantity
        })
        $(".remove").click();
    });
});
$(window).on("load", function () {
    changeVal($(this))
    var qt = $('.qt').length
    // var qts = $('.qt').map(function () {
    //     return $.trim($(this).text());
    // }).get()
    // qts = qts.map(function (x) {
    //     return parseInt(x);
    // });

    var ids = $('.qt').map(function () {
        return $.trim($(this).attr('id'));
    }).get()
    for (var i = 0; i < qt; i++) {
        let id = ids[i]
        quantity[id] = 0;
    }
})