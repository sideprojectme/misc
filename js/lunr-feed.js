---

---
// builds lunr
var index = lunr(function () {
  this.field('title', {boost: 10})
  this.field('content')
  this.field('category', {boost: 100})
  this.field('tags')
  this.ref('id')
});
{% assign count = 0 %}{% for post in site.posts %}
index.add({
  title: {{post.title | jsonify}},
  category: {{post.categories | jsonify}},
  content: {{post.content | strip_html | jsonify}},
  tags: {{post.tags | jsonify}},
  id: {{count}}
});{% assign count = count | plus: 1 %}{% endfor %}
console.log( jQuery.type(index) );
// builds reference data
var store = [{% for post in site.posts %}{
  "title": {{post.title | jsonify}},
  "link": {{ post.url | jsonify }},
  "image": {{ post.img | jsonify }},
  "date": {{ post.date | date: '%B %-d, %Y' | jsonify }},
  "category": {{ post.categories | jsonify }},
  "excerpt": {{ post.description | strip_html | jsonify }},
  "tags": {{ post.tags | jsonify }}
      
             
}{% unless forloop.last %},{% endunless %}{% endfor %}]
// builds search
$(document).ready(function() {
  
    $('input#search').on('keyup', function () {
     
    // Hide the normal post list
    $( ".normal" ).hide();
      
    var resultdiv = $('.results');
    // Get query
    var query = $(this).val();
    // Search for it
    var result = index.search(query);
    // Show results
    resultdiv.empty();


    // Show the normal post list


        // Loop through, match, and add results
        for (var item in result) {
            var ref = result[item].ref;
            var searchitem ='<div class="box"><img class="feat-image" src="/misc/images/'+store[ref].image+'" alt="'+store[ref].title+'"><div class="container"><h4 class="index-title">'+store[ref].title+'</h4><p>'+store[ref].excerpt+'</p><div class="action">'+store[ref].date+'<a href="/misc/'+store[ref].link+'"><i class="fa fa-arrow-right" aria-hidden="true"></i></a></div></div></div>';
            resultdiv.append(searchitem);

        
    };
        if(query.length == 0) {
                $( ".normal" ).show() 
        }
        
        
  }); 
    
    
    
    
    
});
     

                                        
                                        
                                        
$(document).ready(function() {                                        
                                        
$('a.cat').on('click', function(){ 
             // Hide the normal post list
                $( ".normal" ).hide();
                
                var resultdiv = $('.results');
                // Get query
                var query = $(this).text();
                // Search for it
                var result = index.search(query);
                // Show results
                resultdiv.empty();


        // Show the normal post list


        // Loop through, match, and add results
        for (var item in result) {
            var ref = result[item].ref;
            var searchitem ='<div class="column size-1of3"><div class="box"><img class="feat-image" src="/misc/images/'+store[ref].image+'" alt="'+store[ref].title+'"><div class="container"><h4 class="index-title">'+store[ref].title+'</h4><p>'+store[ref].excerpt+'</p><div class="action">'+store[ref].date+'<a href="/misc/'+store[ref].link+'"><i class="fa fa-arrow-right" aria-hidden="true"></i></a></div></div></div></div>';
            resultdiv.append(searchitem);
        };
        
        });
});