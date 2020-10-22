$('#burger-menu').on('click', () => {
    if ($('#invi-nav').hasClass('invisible-nav')) {
        //Change invi bar status
        $('#invi-nav').removeClass('invisible-nav')
        $('#invi-nav').addClass('visible-nav')


        //Change burger menu bars status
        $('#top-bar').css('background-color', 'rgb(29, 29, 29)')
        $('#middle-bar').css('display', 'none')
        $('#bottom-bar').css('background-color', 'rgb(29, 29, 29)')

        //Bar rotation
        $('#top-bar').css('transform', 'rotate(-45deg) translate(-4px, 6px)')
        $('#bottom-bar').css('transform', 'rotate(45deg) translate(-2px, -6px)')
        
    } else {
        //Change invi bar status
        $('#invi-nav').addClass('invisible-nav')
        $('#invi-nav').removeClass('visible-nav')

        //Change burger menu bars status
        $('#top-bar').css('background-color', 'rgb(238, 238, 238)')
        $('#middle-bar').css('display', 'block')
        $('#bottom-bar').css('background-color', 'rgb(238, 238, 238)')


        //Bar rotation
        $('#top-bar').css('transform', 'inherit')
        $('#bottom-bar').css('transform', 'inherit')
    }
})