
$(document).ready(function(){
    getQuery();
    //DISABLE COLLAPSIBLE DEVICE INFO PANEL
    disableDeviceInfoCollapse();
});

// QUERY VALUES ****************************/
// cdip = Collapse Device Info Panel
//      set to "false" to disable

var query = [];
var qObject;

function getQuery(){
    var queries = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(var q = 0; q < queries.length; q++)
    {
        qObject = queries[q].split('=');
        query.push(qObject[0]);
        query[qObject[0]] = qObject[1];
    }
    return query;
}

// QUERY VALUES
// cdip = Collapse Device Info Panel

function disableDeviceInfoCollapse(){
    let param = getQuery()['cdip'];
    if(param === 'false'){
        $('.device-info').removeClass('collapsible');
    }
}
