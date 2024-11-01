function openModalVideo(mid)
{if(typeof mid==="undefined")
{document.getElementById("videoModal").style.display="block";}
else
{document.getElementById("pictureModalVideo"+mid).style.display="block";}}
function closeModalVideo(mid)
{if(typeof mid==="undefined")
{document.getElementById("videoModal").style.display="none";}
else
{document.getElementById("pictureModalVideo"+mid).style.display="none";}}
function openModal(mid)
{document.getElementById("pictureModal"+mid).style.display="block";}
function closeModal(mid)
{document.getElementById("pictureModal"+mid).style.display="none";}
function getRecaptchaResponseToken(token)
{$("#recaptcha_token").val(token);$(".g-recaptcha").removeClass("bc_red");}
function RecaptchaExpired()
{$("#recaptcha_token").val("");$(".g-recaptcha").addClass("bc_red");}
var sms_twilio_counter;var sms_twilio_tries_data;function smsTwilioCounter()
{sms_twilio_tries_data[1]--;document.cookie="sttrida="+sms_twilio_tries_data[0]+","+sms_twilio_tries_data[1]+"; max-age: 86400; path=/; domain=m.happyescorts.com; secure";if(sms_twilio_tries_data[1]<=0)
{clearInterval(sms_twilio_counter);$("#button_send_sms_twilio").data("status-sending","0").removeClass("disabled").text($("#hidden_verify_account_phone_button_send_sms").html());$("#sms_text_check").css("display","none");if(sms_twilio_tries_data[1]<0)document.cookie="sttrida="+sms_twilio_tries_data[0]+",0; max-age: 86400; path=/; domain=m.happyescorts.com; secure";}
$("#button_send_sms_twilio .seconds").text(sms_twilio_tries_data[1]);}
var sms_twilio_callback_check;var sms_twilio_callback_check_counter=0;var sms_twilio_id;function smsTwilioCallbackCheck()
{$.ajax({url:'https://'+window.location.hostname+'/'+'ajax_scripts/get_sms_twilio_status.php',type:'POST',data:{sid:sms_twilio_id},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.status=="sent"||data.status=="delivered")
{$.fancybox.close();$.fancybox.open($("#hidden_verify_account_phone_send_sms_successful").html());$("#button_send_sms_twilio").data("status-sending","1").addClass("disabled");if(sms_twilio_tries_data[0]<3)$("#button_send_sms_twilio").html($("#hidden_verify_account_phone_button_send_sms_counter").html().replace("{SECONDS}",sms_twilio_tries_data[1]));$("#sms_text_check").css("display","inline-block");clearInterval(sms_twilio_callback_check);sms_twilio_counter=setInterval(smsTwilioCounter,1000);}}
else
{$.fancybox.close();$.fancybox.open($("#hidden_verify_account_phone_send_sms_error").html());$("#button_send_sms_twilio").data("status-sending","0");$("#sms_text_check").css("display","none");clearInterval(sms_twilio_callback_check);}}).fail(function()
{});sms_twilio_callback_check_counter++;if(sms_twilio_callback_check_counter>=300)
{$.fancybox.close();$.fancybox.open($("#hidden_verify_account_phone_send_sms_error").html());$("#button_send_sms_twilio").data("status-sending","0");clearInterval(sms_twilio_callback_check);}}
var voice_twilio_callback_check;var voice_twilio_callback_check_counter=0;var voice_twilio_id;function voiceTwilioCallbackCheck()
{$.ajax({url:'https://'+window.location.hostname+'/'+'ajax_scripts/get_voice_twilio_status.php',type:'POST',data:{sid:voice_twilio_id},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.status=="completed")
{$.fancybox.close();$.fancybox.open($("#hidden_verify_account_phone_send_voice_successful").html());$("#button_send_voice_twilio").data("status-sending","0");clearInterval(voice_twilio_callback_check);}
else if(data.status=="no-answer")
{$.fancybox.close();$.fancybox.open($("#hidden_verify_account_phone_send_voice_no_answer").html().replace("{PHONE}",$("#country_code").val()+$("#phone_number").val()));$("#button_send_voice_twilio").data("status-sending","0");clearInterval(voice_twilio_callback_check);}
else if(data.status=="failed")
{$.fancybox.close();var modal_text=$("#hidden_verify_account_phone_send_sms_twilio_wrong_number").html();var country_code=$("#country_code").val();var phone_number=$("#phone_number").val();var country_code_without_plus=country_code.replace("+","");var regexp=new RegExp("^"+country_code_without_plus);if(phone_number.search(regexp)!=-1)
{var phone=country_code_without_plus;phone+="<span style=\"color: #A00;\">";phone+=phone_number.substr(0,country_code_without_plus.length);phone+="</span>";phone+=phone_number.substr(country_code_without_plus.length);modal_text=modal_text.replace("{PHONE}",phone);var modal_text_addon=$("#hidden_verify_account_phone_send_sms_twilio_wrong_number_addon_country_code").html();modal_text_addon=modal_text_addon.replace("{WRONG_DIGITS}",country_code_without_plus);modal_text=modal_text.replace(/<\/p>/,modal_text_addon+"</p>");}
else
{modal_text=modal_text.replace("{PHONE}",country_code+phone_number);}
$.fancybox.open(modal_text);$("#button_send_voice_twilio").data("status-sending","0");clearInterval(voice_twilio_callback_check);}}
else
{$.fancybox.close();$.fancybox.open($("#hidden_verify_account_phone_send_sms_error").html());$("#button_send_voice_twilio").data("status-sending","0");clearInterval(voice_twilio_callback_check);}}).fail(function()
{});voice_twilio_callback_check_counter++;if(voice_twilio_callback_check_counter>=300)
{$.fancybox.close();$.fancybox.open($("#hidden_verify_account_phone_send_voice_call_unable").html().replace("{PHONE}",$("#country_code").val()+$("#phone_number").val()));$("#button_send_voice_twilio").data("status-sending","0");clearInterval(voice_twilio_callback_check);}}
$(document).ready(function()
{var domain_url="https://"+window.location.hostname+"/";var site_language=$("#site_language").html();var other_languages=['de','af','ar','be','bg','cs','da','el','es','et','fi','fr','hu','id','it','ja','ko','lt','lv','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','sw','th','tr','uk','vi','zh-CN','zh-TW'];var anim_title;var anim_title_text="";var anim_title_status=0;function doGTranslate(lang_pair)
{if(lang_pair.value)lang_pair=lang_pair.value;if(lang_pair=='')return;var lang=lang_pair.split('|')[1];var plang=location.pathname.split('/')[1];if(plang.length!=2&&plang.toLowerCase()!='zh-cn'&&plang.toLowerCase()!='zh-tw')plang='en';if(lang=='en')location.href=location.protocol+'//'+location.host+location.pathname.replace('/'+plang+'/','/')+location.search;else location.href=location.protocol+'//'+location.host+'/'+lang+location.pathname.replace('/'+plang+'/','/')+location.search;}
function ajaxInsertContactRequest(type,id)
{$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:type,id:id}).done(function(data){});}
function getNumbersForFilterOption(option)
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter_option.php',type:'POST',data:{option:option,type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.number_of_escorts.length>0)
{if(option=="range")
{for(var i=0;i<data.number_of_escorts.length;i++)
{if($("#filter_"+option).next().next(".optWrapper").length==1)
{if($("#filter_"+option).next().next().find("li").eq(i).find("span.number").length==0)
{$("#filter_"+option).next().next().find("li").eq(i).children().append(' <span class="number">('+data.number_of_escorts[i]+')</span>');}
else
{$("#filter_"+option).next().next().find("li").eq(i).find("span.number").text('('+data.number_of_escorts[i]+')');}}}}
if(option=="escort_type"||option=="body_type"||option=="body_arts"||option=="hair_color"||option=="shaved"||option=="sexual_orientation"||option=="ethnicity"||option=="languages"||option=="available_to"||option=="available_for"||option=="activities"||option=="payment_accepted")
{for(var i=0;i<data.number_of_escorts.length;i++)
{if($("#filter_"+option).next().next(".optWrapper").length==1)
{if($("#filter_"+option).next().next().find("li").eq(i).find("span.number").length==0)
{$("#filter_"+option).next().next().find("li").eq(i).children("label").append(' <span class="number">('+data.number_of_escorts[i]+')</span>');}
else
{$("#filter_"+option).next().next().find("li").eq(i).find("span.number").text('('+data.number_of_escorts[i]+')');}}}}
if(option=="gender"||option=="age_min"||option=="age_max"||option=="height_min"||option=="height_max"||option=="bra_size_letter"||option=="smoker")
{for(var i=1;i<=data.number_of_escorts.length;i++)
{if($("#filter_"+option).next().next(".optWrapper").length==1)
{if($("#filter_"+option).next().next().find("li").eq(i).find("span.number").length==0)
{$("#filter_"+option).next().next().find("li").eq(i).children().append(' <span class="number">('+data.number_of_escorts[i-1]+')</span>');}
else
{$("#filter_"+option).next().next().find("li").eq(i).find("span.number").text('('+data.number_of_escorts[i-1]+')');}}}}}}}).fail(function()
{});}
function getNumbersForFilterOptionsCheckbox()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter_options_checkbox.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if($("#filter_silicone").parent().prev().find("span.number").length==0)
{$("#filter_silicone").parent().prev().append(' <span class="number">('+data.number_of_escorts.silicone+')</span>');}
else
{$("#filter_silicone").parent().prev().find("span.number").text('('+data.number_of_escorts.silicone+')');}
if($("#filter_available_today").parent().prev().find("span.number").length==0)
{$("#filter_available_today").parent().prev().append(' <span class="number">('+data.number_of_escorts.available_today+')</span>');}
else
{$("#filter_available_today").parent().prev().find("span.number").text('('+data.number_of_escorts.available_today+')');}
if($("#filter_reviews").parent().prev().find("span.number").length==0)
{$("#filter_reviews").parent().prev().append(' <span class="number">('+data.number_of_escorts.reviews+')</span>');}
else
{$("#filter_reviews").parent().prev().find("span.number").text('('+data.number_of_escorts.reviews+')');}
if($("#filter_duo_offer").parent().prev().find("span.number").length==0)
{$("#filter_duo_offer").parent().prev().append(' <span class="number">('+data.number_of_escorts.duo_offer+')</span>');}
else
{$("#filter_duo_offer").parent().prev().find("span.number").text('('+data.number_of_escorts.duo_offer+')');}
if($("#filter_discount").parent().prev().find("span.number").length==0)
{$("#filter_discount").parent().prev().append(' <span class="number">('+data.number_of_escorts.discount+')</span>');}
else
{$("#filter_discount").parent().prev().find("span.number").text('('+data.number_of_escorts.discount+')');}
if($("#filter_video").parent().prev().find("span.number").length==0)
{$("#filter_video").parent().prev().append(' <span class="number">('+data.number_of_escorts.video+')</span>');}
else
{$("#filter_video").parent().prev().find("span.number").text('('+data.number_of_escorts.video+')');}
if($("#filter_verified").parent().prev().find("span.number").length==0)
{$("#filter_verified").parent().prev().append(' <span class="number">('+data.number_of_escorts.verified+')</span>');}
else
{$("#filter_verified").parent().prev().find("span.number").text('('+data.number_of_escorts.verified+')');}
if($("#filter_online").parent().prev().find("span.number").length==0)
{$("#filter_online").parent().prev().append(' <span class="number">('+data.number_of_escorts.online+')</span>');}
else
{$("#filter_online").parent().prev().find("span.number").text('('+data.number_of_escorts.online+')');}
if($("#filter_phone_verified").parent().prev().find("span.number").length==0)
{$("#filter_phone_verified").parent().prev().append(' <span class="number">('+data.number_of_escorts.phone_verified+')</span>');}
else
{$("#filter_phone_verified").parent().prev().find("span.number").text('('+data.number_of_escorts.phone_verified+')');}
if($("#filter_new").parent().prev().find("span.number").length==0)
{$("#filter_new").parent().prev().append(' <span class="number">('+data.number_of_escorts.new+')</span>');}
else
{$("#filter_new").parent().prev().find("span.number").text('('+data.number_of_escorts.new+')');}}}).fail(function()
{});}
function getCookie(name)
{var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++)
{var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function findDoubleCookies(name)
{var doubleCookies=[];var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++)
{var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)doubleCookies.push(c.substring(nameEQ.length,c.length));}
return doubleCookies;}
function myTrim(x)
{return x.replace(/^\s+|\s+$/gm,"");}
function myTrimLineBreaks(x)
{return x.replace(/\n|\r/gm,"");}
var double_cookies=findDoubleCookies("9a7a3c54ff29029609663c3a6300e4fc");if(double_cookies.length>1){for(var i=0;i<double_cookies.length;i++){document.cookie="9a7a3c54ff29029609663c3a6300e4fc="+double_cookies[i]+"; max-age=0;";}}
function convertSecondsToReadableFormat(seconds)
{var minutes=Math.floor(seconds/60);var seconds_left=Math.floor(seconds%60);var seconds_left_return;if(seconds_left<10)seconds_left_return="0"+seconds_left;else seconds_left_return=seconds_left;return minutes+":"+seconds_left_return;}
function updateNumbersInFilterForSearchText()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(search_text!="")$("#filter_search_text").parents(".filter_search_text").addClass("active");else $("#filter_search_text").parents(".filter_search_text").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
var timer_input_search_text;function onInputFilterSearchText()
{clearTimeout(timer_input_search_text);timer_input_search_text=setTimeout(updateNumbersInFilterForSearchText.bind(this),1000);}
$(window).scroll(function()
{if($(this).scrollTop()>75)
{$("a.target_burger").addClass("scrolled");}
else
{$("a.target_burger").removeClass("scrolled");}
if($(this).scrollTop()>200)
{$(".go_top").fadeIn(200);}
else
{$(".go_top").fadeOut(200);}
var vp_top=$(this).scrollTop();var vp_bottom=vp_top+$(this).height();$(".solimp").each(function()
{var bounds=$(this).offset();var el_top=bounds.top-100;var el_bottom=el_top+0;if(!(vp_bottom<el_top||vp_top>el_bottom))
{var impurl=$(this).attr("data-impurl");var seen=$(this).attr("data-seen");if(impurl!=""&&seen=="0")
{$.get(impurl);$(this).attr("data-seen","1");}}});});$("a.target_burger").click(function(e)
{$(".div_logo, .div_navigation, main, nav.main_nav, a.target_burger, ul.buns li.text, .target_lang_selection, .mobile_desktop_switch").toggleClass("toggled");$("html,body").scrollTop(0);e.preventDefault();});$(".target_lang_selection").click(function(e)
{$(".div_logo, .div_navigation, main, .lang_selection").toggleClass("toggled");e.preventDefault();});$("#logout").click(function(e)
{$.post(domain_url+'ajax_scripts/user_logout.php',{}).done(function(data)
{if(typeof data!=="undefined"&&data!==null)
{var data2=JSON.parse(data);if(data2.result=="ok")
{if(data2.type=="escort")window.location.href=domain_url+(site_language!="en"?site_language+"/":"");else window.location.reload();}}});});if($("#messages_icon").length>0)
{$("#messages_icon").click(function()
{var code=$(this).attr("data-code");window.location.href=domain_url+(site_language!="en"?site_language+"/":"")+"happyescorts-messenger-"+code;});if($("#messages_icon").hasClass("show_modal")&&$("#messages_icon .number span").text()!=0)
{if($.fancybox)
{var new_messages_text1="";if($("#messages_icon").hasClass("member"))new_messages_text1=$("#hidden_modal_new_private_messages_text1_member").html();else new_messages_text1=$("#hidden_modal_new_private_messages_text1").html();$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_new_private_messages_title").html()+'</span><p>'+new_messages_text1+$("#hidden_modal_new_private_messages_text2").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{var user_id=$("#messages_icon").attr("data-user-id");var code=$("#messages_icon").attr("data-code");$.ajax({url:domain_url+'ajax_scripts/set_status_from_informed_about_user'+'.php',type:'POST',data:{type:'new_private_messages_modal',user_id:user_id,code:code},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{window.location.reload();}});});$(current.$content).find("#choice_button_to_messenger").on("click touchend",function()
{var user_id=$("#messages_icon").attr("data-user-id");var code=$("#messages_icon").attr("data-code");window.open(domain_url+"happyescorts-messenger-"+code);$.ajax({url:domain_url+'ajax_scripts/set_status_from_informed_about_user'+'.php',type:'POST',data:{type:'new_private_messages_modal',user_id:user_id,code:code},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{window.location.reload();}});});}});}}}
if($("#escort_of_the_week_hint_city_name").length>0&&!($("#messages_icon").hasClass("show_modal")&&$("#messages_icon .number span").text()!=0))
{if($.fancybox)
{var escort_of_the_week_hint_text1=$("#hidden_modal_escort_of_the_week_hint_text1").html();escort_of_the_week_hint_text1=escort_of_the_week_hint_text1.replaceAll("{CITY}",$("#escort_of_the_week_hint_city_name").text());escort_of_the_week_hint_text1=escort_of_the_week_hint_text1.replaceAll("{MEMBERSHIP_NAME}",$("#escort_of_the_week_hint_membership_name").text());escort_of_the_week_hint_text1=escort_of_the_week_hint_text1.replaceAll("{EXTEND_LINK}",domain_url+(site_language!="en"?site_language+"/":"")+"extend-subscription-"+$("#escort_of_the_week_hint_extend_code").text());escort_of_the_week_hint_text1=escort_of_the_week_hint_text1.replaceAll("{FAQ_LINK}",domain_url+(site_language!="en"?site_language+"/":"")+"help?show=escort13");$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_escort_of_the_week_hint_title").html()+'</span><p>'+escort_of_the_week_hint_text1+$("#hidden_modal_escort_of_the_week_hint_text2").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();document.cookie="eowhint_dsa=1;max-age=31536000;path=/;domain=.happyescorts.com;secure=true;";});},afterClose:function(instance,current)
{document.cookie="eowhint_dsa=1;max-age=31536000;path=/;domain=.happyescorts.com;secure=true;";}});}}
$(".go_top").click(function(e)
{e.preventDefault();e.stopPropagation();$("html,body").animate({scrollTop:0},300);});if($("#link_home_caption").length>0)
{$("#link_home_caption").click(function()
{$("#link_home_submenu").toggleClass("active");if($("#link_home_submenu").hasClass("active"))$("#link_home_caption > span").html('▲');else $("#link_home_caption > span").html('▼');});}
if($("#link_escorts_caption").length>0)
{$("#link_escorts_caption").click(function()
{$("#link_escorts_submenu").toggleClass("active");if($("#link_escorts_submenu").hasClass("active"))$("#link_escorts_caption > span").html('▲');else $("#link_escorts_caption > span").html('▼');});}
if($("#link_advertise_with_us_caption").length>0)
{$("#link_advertise_with_us_caption").click(function()
{$("#link_advertise_with_us_submenu").toggleClass("active");if($("#link_advertise_with_us_submenu").hasClass("active"))$("#link_advertise_with_us_caption > span").html('▲');else $("#link_advertise_with_us_caption > span").html('▼');});}
$(".pagination_mobile_goto input").keyup(function()
{var value=$(this).val();$(this).val(value.replace(/[^0-9]+/,""));});$(".pagination_mobile_goto div").click(function()
{var page=parseInt($("#page_mobile").val().replace(/[^0-9]+/,""));var page_max=parseInt($(".pagination_mobile_numbers_overall2").children("a").last().html());if(page>0&&page<=page_max)
{var entries_per_site=36;if(window.location.pathname.search(/^\/escort-agencies\/(latest|updated|popular)/)!=-1)entries_per_site=36;if(window.location.pathname.search(/^\/links/)!=-1)entries_per_site=36;if(window.location.pathname.search(/^\/escort-reviews/)!=-1)entries_per_site=36;var link=window.location.href.replace(/\?limitstart=[0-9]+$/,"");if(page>1)link+="?limitstart="+((page-1)*entries_per_site);window.location.href=link;}});if($(".pagination_mobile_numbers_overall").length>0&&$(window).width()<=1024)
{var page_links=$(".pagination_mobile_numbers_overall2 a");var pagination_width=0;if(page_links.length>0)
{$(page_links).each(function(){pagination_width+=$(this).outerWidth(true);});}
var page_spans=$(".pagination_mobile_numbers_overall2 span");if(page_spans.length>0)
{$(page_spans).each(function(){pagination_width+=$(this).outerWidth(true);});}
pagination_width+=6;$(".pagination_mobile_numbers_overall2").css("width",pagination_width+"px");}
if($("#button_show_more_aow").length>0)
{$("#button_show_more_aow").click(function()
{var aow_ids=[];$(".card_aow_overall").each(function()
{aow_ids.push(parseInt($(this).attr("data-id")));});$.ajax({url:domain_url+'ajax_scripts/get_more_aow.php',type:'POST',data:{aow_ids:aow_ids,lang:site_language},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#button_show_more_aow").addClass("hidden");$("#button_show_more_aow").after(data.aow_results);$("#button_show_more_aow").parent().find(".lazy").lazy({threshold:100});}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#button_show_more_eow").length>0)
{$("#button_show_more_eow").click(function()
{var eow_ids=[];$(".card_eow_overall").each(function()
{eow_ids.push(parseInt($(this).attr("data-id")));});$.ajax({url:domain_url+'ajax_scripts/get_more_eow.php',type:'POST',data:{eow_ids:eow_ids,lang:site_language},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#button_show_more_eow").addClass("hidden");$("#button_show_more_eow").after(data.eow_results);$("#button_show_more_eow").parent().find(".lazy").lazy({threshold:100});}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#button_location_search").length>0)
{if(window.location.href.indexOf("escorts/search-engine")!=-1)
{$(".div_navigation .back_button").click(function()
{var href=window.location.href.replace("escorts/search-engine","");window.location.href=href;});$("#button_location_search").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'location',search_engine_page:1,search_engine_last_pages:null}).done(function(data)
{window.location.href=window.location.href;}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
else
{if(window.location.href.substr(window.location.href.length-1,1)=="/")
{$("#button_location_search").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'location',search_engine_page:1,search_engine_last_pages:null,filter_search_text:'',filter_search_text_city_id:'0',filter_range:'25',filter_escort_type:'',filter_gender:'nothing',filter_age_min:'0',filter_age_max:'0',filter_height_min:'0',filter_height_max:'0',filter_body_type:'',filter_bra_size_letter:'ZERO',filter_hair_color:'',filter_shaved:'',filter_sexual_orientation:'',filter_smoker:'nothing',filter_ethnicity:'',filter_languages:'',filter_available_to:'',filter_available_for:'',filter_available_today:'0',filter_reviews:'0',filter_duo_offer:'0',filter_activities:'',filter_price_min:'',filter_price_max:'',filter_currency:'nothing',filter_payment_accepted:'',filter_discount:'0',filter_video:'0',filter_verified:'0',filter_online:'0',filter_phone_verified:'0',filter_new:'0'}).done(function(data)
{var linktolocation=window.location.href+"escorts/search-engine";window.location.href=linktolocation;}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}}}
if($("#city_awesomplete").length>0)
{$.get(domain_url+'ajax_scripts/get_cities_for_city_awesomplete.php').done(function(data)
{var city_awesomplete=document.getElementById("city_awesomplete");new Awesomplete(city_awesomplete,{list:data,minChars:3,maxItems:5,filter:Awesomplete.FILTER_STARTSWITH,sort:false});$("#city_awesomplete").on("awesomplete-selectcomplete",function(data)
{$("#button_city_search").trigger("click");$("#button_city_search2").trigger("click");});if($(window).width()<=768)
{$("#city_awesomplete").on("focus",function()
{$("html,body").scrollTop($("#city_awesomplete").offset().top-50);});}});}
if(true)
{var focus_execute_text_awesomplete=true;if($("#text_awesomplete").length>0)
{$("#text_awesomplete").on("focus",function()
{if($("#search_suggestions").length==0)
{$.get(domain_url+'ajax_scripts/get_suggestions_for_text_awesomplete.php').done(function(data)
{$("#hidden_language_values_js").after(data);if($("#search_suggestions").length>0)
{var text_awesomplete=document.getElementById("text_awesomplete");new Awesomplete(text_awesomplete,{list:'#search_suggestions',minChars:3,maxItems:5,filter:Awesomplete.FILTER_CONTAINS,sort:false});$("#text_awesomplete").on("awesomplete-open",function(data)
{console.log("Awesomplete opened");if($("#awesomplete_list_1 li").length>0)
{var current_group="";$("#awesomplete_list_1 li").each(function()
{var group=$(this).data("group");if(current_group=="")
{current_group=group;if(current_group=="country")$(this).before('<li class="group">'+(site_language=="de"?"Länder":"Countries")+'</li>');if(current_group=="city")$(this).before('<li class="group">'+(site_language=="de"?"Städte":"Cities")+'</li>');if(current_group=="escort_type")$(this).before('<li class="group">'+(site_language=="de"?"Escort Arten":"Escort types")+'</li>');if(current_group=="gender")$(this).before('<li class="group">'+(site_language=="de"?"Geschlechter":"Genders")+'</li>');if(current_group=="body_type")$(this).before('<li class="group">'+(site_language=="de"?"Figur":"Body types")+'</li>');if(current_group=="body_art")$(this).before('<li class="group">'+(site_language=="de"?"Body arts":"Body arts")+'</li>');if(current_group=="hair_color")$(this).before('<li class="group">'+(site_language=="de"?"Haarfarben":"Hair colors")+'</li>');if(current_group=="eye_color")$(this).before('<li class="group">'+(site_language=="de"?"Augenfarben":"Eye colors")+'</li>');if(current_group=="shaved")$(this).before('<li class="group">'+(site_language=="de"?"Intimrasur":"Shaved")+'</li>');if(current_group=="sexual_orientation")$(this).before('<li class="group">'+(site_language=="de"?"Sexuelle Orientierungen":"Sexual Orientations")+'</li>');if(current_group=="ethnicity")$(this).before('<li class="group">'+(site_language=="de"?"Ethnische Gruppen":"Ethnicities")+'</li>');if(current_group=="languages")$(this).before('<li class="group">'+(site_language=="de"?"Sprachen":"Languages")+'</li>');if(current_group=="available_for")$(this).before('<li class="group">'+(site_language=="de"?"Verfügbarkeit":"Available for")+'</li>');if(current_group=="payment_accepted")$(this).before('<li class="group">'+(site_language=="de"?"Zahlungsarten":"Payment accepted")+'</li>');if(current_group=="silicone")$(this).before('<li class="group">'+(site_language=="de"?"Silikon":"Silicone")+'</li>');if(current_group=="status")$(this).before('<li class="group">'+(site_language=="de"?"Status":"Status")+'</li>');if(current_group=="smoker")$(this).before('<li class="group">'+(site_language=="de"?"Raucher":"Smoker")+'</li>');}
else
{if(group!=current_group)
{current_group=group;if(current_group=="country")$(this).before('<li class="group">'+(site_language=="de"?"Länder":"Countries")+'</li>');if(current_group=="city")$(this).before('<li class="group">'+(site_language=="de"?"Städte":"Cities")+'</li>');if(current_group=="escort_type")$(this).before('<li class="group">'+(site_language=="de"?"Escort Arten":"Escort types")+'</li>');if(current_group=="gender")$(this).before('<li class="group">'+(site_language=="de"?"Geschlechter":"Genders")+'</li>');if(current_group=="body_type")$(this).before('<li class="group">'+(site_language=="de"?"Figur":"Body types")+'</li>');if(current_group=="body_art")$(this).before('<li class="group">'+(site_language=="de"?"Body arts":"Body arts")+'</li>');if(current_group=="hair_color")$(this).before('<li class="group">'+(site_language=="de"?"Haarfarben":"Hair colors")+'</li>');if(current_group=="eye_color")$(this).before('<li class="group">'+(site_language=="de"?"Augenfarben":"Eye colors")+'</li>');if(current_group=="shaved")$(this).before('<li class="group">'+(site_language=="de"?"Intimrasur":"Shaved")+'</li>');if(current_group=="sexual_orientation")$(this).before('<li class="group">'+(site_language=="de"?"Sexuelle Orientierungen":"Sexual Orientations")+'</li>');if(current_group=="ethnicity")$(this).before('<li class="group">'+(site_language=="de"?"Ethnische Gruppen":"Ethnicities")+'</li>');if(current_group=="languages")$(this).before('<li class="group">'+(site_language=="de"?"Sprachen":"Languages")+'</li>');if(current_group=="available_for")$(this).before('<li class="group">'+(site_language=="de"?"Verfügbarkeit":"Available for")+'</li>');if(current_group=="payment_accepted")$(this).before('<li class="group">'+(site_language=="de"?"Zahlungsarten":"Payment accepted")+'</li>');if(current_group=="silicone")$(this).before('<li class="group">'+(site_language=="de"?"Silikon":"Silicone")+'</li>');if(current_group=="status")$(this).before('<li class="group">'+(site_language=="de"?"Status":"Status")+'</li>');if(current_group=="smoker")$(this).before('<li class="group">'+(site_language=="de"?"Raucher":"Smoker")+'</li>');}}});}});$("#text_awesomplete").on("awesomplete-selectcomplete",function(data)
{if($("#button_text_search").length>0)$("#button_text_search").trigger("click");if($("#button_text_search2").length>0)$("#button_text_search2").trigger("click");});if($(window).width()<=768)
{$("#text_awesomplete").on("focus",function()
{$("html,body").scrollTop($("#text_awesomplete").offset().top-50);});}}
if(focus_execute_text_awesomplete)document.getElementById("text_awesomplete").focus();focus_execute_text_awesomplete=false;});}});}
var focus_execute_filter_search_text=true;if($("#filter_search_text").length>0)
{$("#filter_search_text").on("focus",function()
{if($("#search_suggestions").length==0)
{$.get(domain_url+'ajax_scripts/get_suggestions_for_text_awesomplete.php').done(function(data)
{$("#hidden_language_values_js").after(data);if($("#search_suggestions").length>0)
{var text_awesomplete_filter=document.getElementById("filter_search_text");new Awesomplete(text_awesomplete_filter,{list:'#search_suggestions',minChars:3,maxItems:5,filter:Awesomplete.FILTER_CONTAINS,sort:false});$("#filter_search_text").on("awesomplete-open",function(data)
{console.log("Awesomplete opened");if($("#awesomplete_list_1 li").length>0)
{var current_group="";$("#awesomplete_list_1 li").each(function()
{var group=$(this).data("group");if(current_group=="")
{current_group=group;if(current_group=="country")$(this).before('<li class="group">'+(site_language=="de"?"Länder":"Countries")+'</li>');if(current_group=="city")$(this).before('<li class="group">'+(site_language=="de"?"Städte":"Cities")+'</li>');if(current_group=="escort_type")$(this).before('<li class="group">'+(site_language=="de"?"Escort Arten":"Escort types")+'</li>');if(current_group=="gender")$(this).before('<li class="group">'+(site_language=="de"?"Geschlechter":"Genders")+'</li>');if(current_group=="body_type")$(this).before('<li class="group">'+(site_language=="de"?"Figur":"Body types")+'</li>');if(current_group=="body_art")$(this).before('<li class="group">'+(site_language=="de"?"Body arts":"Body arts")+'</li>');if(current_group=="hair_color")$(this).before('<li class="group">'+(site_language=="de"?"Haarfarben":"Hair colors")+'</li>');if(current_group=="eye_color")$(this).before('<li class="group">'+(site_language=="de"?"Augenfarben":"Eye colors")+'</li>');if(current_group=="shaved")$(this).before('<li class="group">'+(site_language=="de"?"Intimrasur":"Shaved")+'</li>');if(current_group=="sexual_orientation")$(this).before('<li class="group">'+(site_language=="de"?"Sexuelle Orientierungen":"Sexual Orientations")+'</li>');if(current_group=="ethnicity")$(this).before('<li class="group">'+(site_language=="de"?"Ethnische Gruppen":"Ethnicities")+'</li>');if(current_group=="languages")$(this).before('<li class="group">'+(site_language=="de"?"Sprachen":"Languages")+'</li>');if(current_group=="available_for")$(this).before('<li class="group">'+(site_language=="de"?"Verfügbarkeit":"Available for")+'</li>');if(current_group=="payment_accepted")$(this).before('<li class="group">'+(site_language=="de"?"Zahlungsarten":"Payment accepted")+'</li>');if(current_group=="silicone")$(this).before('<li class="group">'+(site_language=="de"?"Silikon":"Silicone")+'</li>');if(current_group=="status")$(this).before('<li class="group">'+(site_language=="de"?"Status":"Status")+'</li>');if(current_group=="smoker")$(this).before('<li class="group">'+(site_language=="de"?"Raucher":"Smoker")+'</li>');}
else
{if(group!=current_group)
{current_group=group;if(current_group=="country")$(this).before('<li class="group">'+(site_language=="de"?"Länder":"Countries")+'</li>');if(current_group=="city")$(this).before('<li class="group">'+(site_language=="de"?"Städte":"Cities")+'</li>');if(current_group=="escort_type")$(this).before('<li class="group">'+(site_language=="de"?"Escort Arten":"Escort types")+'</li>');if(current_group=="gender")$(this).before('<li class="group">'+(site_language=="de"?"Geschlechter":"Genders")+'</li>');if(current_group=="body_type")$(this).before('<li class="group">'+(site_language=="de"?"Figur":"Body types")+'</li>');if(current_group=="body_art")$(this).before('<li class="group">'+(site_language=="de"?"Body arts":"Body arts")+'</li>');if(current_group=="hair_color")$(this).before('<li class="group">'+(site_language=="de"?"Haarfarben":"Hair colors")+'</li>');if(current_group=="eye_color")$(this).before('<li class="group">'+(site_language=="de"?"Augenfarben":"Eye colors")+'</li>');if(current_group=="shaved")$(this).before('<li class="group">'+(site_language=="de"?"Intimrasur":"Shaved")+'</li>');if(current_group=="sexual_orientation")$(this).before('<li class="group">'+(site_language=="de"?"Sexuelle Orientierungen":"Sexual Orientations")+'</li>');if(current_group=="ethnicity")$(this).before('<li class="group">'+(site_language=="de"?"Ethnische Gruppen":"Ethnicities")+'</li>');if(current_group=="languages")$(this).before('<li class="group">'+(site_language=="de"?"Sprachen":"Languages")+'</li>');if(current_group=="available_for")$(this).before('<li class="group">'+(site_language=="de"?"Verfügbarkeit":"Available for")+'</li>');if(current_group=="payment_accepted")$(this).before('<li class="group">'+(site_language=="de"?"Zahlungsarten":"Payment accepted")+'</li>');if(current_group=="silicone")$(this).before('<li class="group">'+(site_language=="de"?"Silikon":"Silicone")+'</li>');if(current_group=="status")$(this).before('<li class="group">'+(site_language=="de"?"Status":"Status")+'</li>');if(current_group=="smoker")$(this).before('<li class="group">'+(site_language=="de"?"Raucher":"Smoker")+'</li>');}}});}});$("#filter_search_text").on("awesomplete-selectcomplete",function(data)
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(search_text!="")$("#filter_search_text").parents(".filter_search_text").addClass("active");else $("#filter_search_text").parents(".filter_search_text").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_search_text").on("input",onInputFilterSearchText);if($(window).width()<=768)
{$("#filter_search_text").on("focus",function()
{$("html,body").scrollTop($("#filter_search_text").offset().top-50);});}}
if(focus_execute_filter_search_text)document.getElementById("filter_search_text").focus();focus_execute_filter_search_text=false;});}});}}
else
{}
if($("#button_city_search").length>0)
{$("#button_city_search").click(function()
{var city=$("#city_awesomplete").val();if(city!="")
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'city',search_engine_city:city,search_engine_page:1}).done(function(data)
{window.location.href=window.location.href;}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_search_engine_modal_no_city_title").html()+'</span><p>'+$("#hidden_search_engine_modal_no_city_text").html()+'</p></div>');}});}
if($("#button_city_search2").length>0)
{$("#button_city_search2").click(function()
{var city=$("#city_awesomplete").val();if(city!="")
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'city',search_engine_city:city,search_engine_page:1}).done(function(data)
{var linktolocation=window.location.href+"escorts/search-engine";window.location.href=linktolocation;}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_search_engine_modal_no_city_title").html()+'</span><p>'+$("#hidden_search_engine_modal_no_city_text").html()+'</p></div>');}});}
if($("#button_text_search").length>0)
{$("#button_text_search").click(function()
{var text=$("#text_awesomplete").val();if(text!="")
{var ts=Math.round(new Date().getTime()/1000);$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'text',filter_search_text:text,search_engine_page:1,search_engine_time:ts}).done(function(data)
{window.location.href=window.location.href;}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_search_engine_modal_no_text_title").html()+'</span><p>'+$("#hidden_search_engine_modal_no_text_text").html()+'</p></div>');}});}
if($("#button_text_search2").length>0)
{$("#button_text_search2").click(function()
{var text=$("#text_awesomplete").val();if(text!="")
{var ts=Math.round(new Date().getTime()/1000);$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'text',filter_search_text:text,search_engine_page:1,search_engine_time:ts}).done(function(data)
{var linktolocation=window.location.href;linktolocation=linktolocation.replace(/\?amigosid=[0-9]+$/,"");linktolocation+="escorts/search-engine";window.location.href=linktolocation;}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_search_engine_modal_no_text_title").html()+'</span><p>'+$("#hidden_search_engine_modal_no_text_text").html()+'</p></div>');}});$(".search_trends_option").each(function()
{$(this).click(function()
{var st=$(this).text();$("#text_awesomplete").val(st);$("#button_text_search2").trigger("click");})});}
if($("#home_show_more_wanted_cities").length>0)
{$("#home_show_more_wanted_cities").click(function()
{$("#home_more_wanted_cities").removeClass("hidden");$("#home_show_more_wanted_cities").addClass("hidden");$("#home_hide_more_wanted_cities").removeClass("hidden");});}
if($("#home_hide_more_wanted_cities").length>0)
{$("#home_hide_more_wanted_cities").click(function()
{$("#home_more_wanted_cities").addClass("hidden");$("#home_hide_more_wanted_cities").addClass("hidden");$("#home_show_more_wanted_cities").removeClass("hidden");});}
if($("#location_search_content").length>0)
{$(".div_navigation .back_button").click(function()
{$.post(domain_url+'ajax_scripts/get_session_value.php',{key:'search_engine_last_pages'}).done(function(data)
{if(typeof data!=="undefined"&&data!==null)
{var last_pages=JSON.parse(data);if(last_pages!==null&&last_pages.length>0)
{var previous_page=last_pages[last_pages.length-1];last_pages.pop();var send_last_pages;if(last_pages.length>0)send_last_pages=last_pages;else send_last_pages=null;$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_page:previous_page,search_engine_last_pages:send_last_pages}).done(function(data)
{window.location.href=window.location.href;$("html,body").scrollTop(0);}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$("#button_back").trigger("click");}}
else
{$("#button_back").trigger("click");}});});$("#button_back").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'choice',search_engine_page:1}).done(function(data)
{window.location.href=window.location.href;$("html,body").scrollTop(0);}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#button_filter").click(function()
{$("html,body").scrollTop(0);$("#dark_overlay").removeClass("hidden");$("#filter_overall").addClass("active");getNumbersForFilterOptionsCheckbox();});if(navigator.geolocation)
{function get_location()
{navigator.geolocation.getCurrentPosition(start_search,error_location);}
function start_search(position)
{var lat=position.coords.latitude;var lng=position.coords.longitude;var page=1;var lang=$("#location_search_content").data("lang");if($("#location_search_content").data("page")!='')page=$("#location_search_content").data("page");$.ajax({url:domain_url+(site_language!="en"&&site_language!="de"?site_language+'/':'')+'ajax_scripts/get_location_search_results.php',type:'POST',data:{lat:lat,lng:lng,page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.change_to_text_search)
{window.location.reload();return false;}
if(data.escort_results!="")
{$("#location_search_page").html(data.page);$("#location_search_content").html(data.escort_results);$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');}
$("#location_search_content").data("lat",lat);$("#location_search_content").data("lng",lng);}});}
function error_location(error)
{switch(error.code)
{case error.PERMISSION_DENIED:$.fancybox.open('<div class="toast_message error"><span class="h2">Error</span><p>Location request rejected!</p></div>');break;case error.POSITION_UNAVAILABLE:$.fancybox.open('<div class="toast_message error"><span class="h2">Error</span><p>Location data not available!</p></div>');break;case error.TIMEOUT:$.fancybox.open('<div class="toast_message error"><span class="h2">Error</span><p>Timeout at request!</p></div>');break;case error.UNKNOWN_ERROR:$.fancybox.open('<div class="toast_message error"><span class="h2">Error</span><p>Unknown error!</p></div>');break;}}
get_location();}
else
{$.fancybox.open('<div class="toast_message error"><span class="h2">Error</span><p>Your browser don´t support the geolocation API!</p></div>');}}
if($("#city_search_content").length>0)
{$(".div_navigation .back_button").click(function()
{$.post(domain_url+'ajax_scripts/get_session_value.php',{key:'search_engine_last_pages'}).done(function(data)
{if(typeof data!=="undefined"&&data!==null)
{var last_pages=JSON.parse(data);if(last_pages!==null&&last_pages.length>0)
{var previous_page=last_pages[last_pages.length-1];console.log("Before: "+last_pages);last_pages.pop();console.log("After: "+last_pages);console.log(previous_page);var send_last_pages;if(last_pages.length>0)send_last_pages=last_pages;else send_last_pages=null;$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_page:previous_page,search_engine_last_pages:send_last_pages}).done(function(data)
{window.location.href=window.location.href;$("html,body").scrollTop(0);}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$("#button_back").trigger("click");}}
else
{$("#button_back").trigger("click");}});});$("#button_back").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'choice',search_engine_page:1}).done(function(data)
{window.location.href=window.location.href;$("html,body").scrollTop(0);}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#button_filter").click(function()
{$("html,body").scrollTop(0);$("#dark_overlay").removeClass("hidden");$("#filter_overall").addClass("active");getNumbersForFilterOptionsCheckbox();});$("#city_search_content").on("keyup",".pagination_mobile_goto input",function()
{var value=$(this).val();$(this).val(value.replace(/[^0-9]+/,""));});$("#city_search_content").on("click",".pagination_mobile_goto div",function()
{var page=parseInt($("#page_mobile").val().replace(/[^0-9]+/,""));var page_max=parseInt($(".pagination_mobile_numbers_overall2").children("span").last().html());var lang=$(".pagination_mobile_overall").data("lang");if(page>0&&page<=page_max)
{$.ajax({url:domain_url+'ajax_scripts/get_city_search_results.php',type:'POST',data:{page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.escort_results!="")
{var title=document.title;title=title.replace(/(- [0-9]+|) \| HappyEscorts\.com/,data.page+" | HappyEscorts.com");document.title=title;$("#city_search_page").html(data.page);$("#city_search_content").html(data.escort_results);$("#slds_top").html('');$("#slds_top").html(data.slds_top);if(data.slds_top=="")$("#slds_top").addClass("hidden");else $("#slds_top").removeClass("hidden");$("#slds_bottom").html('');$.ajax({url:domain_url+'ajax_scripts/get_ads_bottom.php',type:'GET',dataType:'json'}).done(function(data)
{$("#slds_bottom").html(data.slds_bottom);if(data.slds_bottom=="")$("#slds_bottom").addClass("hidden");else $("#slds_bottom").removeClass("hidden");});$("html,body").scrollTop(0);}}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>An error occurred!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>The page number is out of range!</p></div>');}});$("#city_search_content").on("click",".pagination_mobile_prev",function()
{var page=parseInt($(".pagination_mobile_numbers_overall2 span.active").html())-1;var lang=$(".pagination_mobile_overall").data("lang");$.ajax({url:domain_url+'ajax_scripts/get_city_search_results.php',type:'POST',data:{page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.escort_results!="")
{var title=document.title;title=title.replace(/(- [0-9]+|) \| HappyEscorts\.com/,data.page+" | HappyEscorts.com");document.title=title;$("#city_search_page").html(data.page);$("#city_search_content").html(data.escort_results);$("#slds_top").html('');$("#slds_top").html(data.slds_top);if(data.slds_top=="")$("#slds_top").addClass("hidden");else $("#slds_top").removeClass("hidden");$("#slds_bottom").html('');$.ajax({url:domain_url+'ajax_scripts/get_ads_bottom.php',type:'GET',dataType:'json'}).done(function(data)
{$("#slds_bottom").html(data.slds_bottom);if(data.slds_bottom=="")$("#slds_bottom").addClass("hidden");else $("#slds_bottom").removeClass("hidden");});$("html,body").scrollTop(0);}}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>An error occurred!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#city_search_content").on("click",".pagination_mobile_numbers_overall2 span",function()
{var page=parseInt($(this).attr("id").replace(/page/,""));var lang=$(".pagination_mobile_overall").data("lang");$.ajax({url:domain_url+'ajax_scripts/get_city_search_results.php',type:'POST',data:{page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.escort_results!="")
{var title=document.title;title=title.replace(/(- [0-9]+|) \| HappyEscorts\.com/,data.page+" | HappyEscorts.com");document.title=title;$("#city_search_page").html(data.page);$("#city_search_content").html(data.escort_results);$("#slds_top").html('');$("#slds_top").html(data.slds_top);if(data.slds_top=="")$("#slds_top").addClass("hidden");else $("#slds_top").removeClass("hidden");$("#slds_bottom").html('');$.ajax({url:domain_url+'ajax_scripts/get_ads_bottom.php',type:'GET',dataType:'json'}).done(function(data)
{$("#slds_bottom").html(data.slds_bottom);if(data.slds_bottom=="")$("#slds_bottom").addClass("hidden");else $("#slds_bottom").removeClass("hidden");});$("html,body").scrollTop(0);}}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>An error occurred!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#city_search_content").on("click",".pagination_mobile_next",function()
{var page=parseInt($(".pagination_mobile_numbers_overall2 span.active").html())+1;var lang=$(".pagination_mobile_overall").data("lang");$.ajax({url:domain_url+'ajax_scripts/get_city_search_results.php',type:'POST',data:{page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.escort_results!="")
{var title=document.title;title=title.replace(/(- [0-9]+|) \| HappyEscorts\.com/,data.page+" | HappyEscorts.com");document.title=title;$("#city_search_page").html(data.page);$("#city_search_content").html(data.escort_results);$("#slds_top").html('');$("#slds_top").html(data.slds_top);if(data.slds_top=="")$("#slds_top").addClass("hidden");else $("#slds_top").removeClass("hidden");$("#slds_bottom").html('');$.ajax({url:domain_url+'ajax_scripts/get_ads_bottom.php',type:'GET',dataType:'json'}).done(function(data)
{$("#slds_bottom").html(data.slds_bottom);if(data.slds_bottom=="")$("#slds_bottom").addClass("hidden");else $("#slds_bottom").removeClass("hidden");});$("html,body").scrollTop(0);}}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>An error occurred!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#text_search_content").length>0)
{$(".div_navigation .back_button").click(function()
{$.post(domain_url+'ajax_scripts/get_session_value.php',{key:'search_engine_last_pages'}).done(function(data)
{if(typeof data!=="undefined"&&data!==null)
{var last_pages=JSON.parse(data);if(last_pages!==null&&last_pages.length>0)
{var previous_page=last_pages[last_pages.length-1];last_pages.pop();var send_last_pages;if(last_pages.length>0)send_last_pages=last_pages;else send_last_pages=null;$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_page:previous_page,search_engine_last_pages:send_last_pages}).done(function(data)
{window.location.href=window.location.href;$("html,body").scrollTop(0);}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$("#button_back").trigger("click");}}
else
{$("#button_back").trigger("click");}});});$("#button_back").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'choice',search_engine_page:1,filter_search_text:''}).done(function(data)
{window.location.href=window.location.href;$("html,body").scrollTop(0);}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#button_filter").click(function()
{$("html,body").scrollTop(0);$("#dark_overlay").removeClass("hidden");$("#filter_overall").addClass("active");getNumbersForFilterOptionsCheckbox();});$("#text_search_content").on("keyup",".pagination_mobile_goto input",function()
{var value=$(this).val();$(this).val(value.replace(/[^0-9]+/,""));});$("#text_search_content").on("click",".pagination_mobile_goto div",function()
{var page=parseInt($("#page_mobile").val().replace(/[^0-9]+/,""));var page_max=parseInt($(".pagination_mobile_numbers_overall2").children("span").last().html());var lang=$(".pagination_mobile_overall").data("lang");if(page>0&&page<=page_max)
{$.ajax({url:domain_url+'ajax_scripts/get_text_search_results.php',type:'POST',data:{page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.escort_results!="")
{var title=document.title;title=title.replace(/(- [0-9]+|) \| HappyEscorts\.com/,data.page+" | HappyEscorts.com");document.title=title;$("#text_search_page").html(data.page);$("#text_search_content").html(data.escort_results);$("#slds_top").html('');$("#slds_top").html(data.slds_top);if(data.slds_top=="")$("#slds_top").addClass("hidden");else $("#slds_top").removeClass("hidden");$("#slds_bottom").html('');$.ajax({url:domain_url+'ajax_scripts/get_ads_bottom.php',type:'GET',dataType:'json'}).done(function(data)
{$("#slds_bottom").html(data.slds_bottom);if(data.slds_bottom=="")$("#slds_bottom").addClass("hidden");else $("#slds_bottom").removeClass("hidden");});$("html,body").scrollTop(0);}}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>An error occurred!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>The page number is out of range!</p></div>');}});$("#text_search_content").on("click",".pagination_mobile_prev",function()
{var page=parseInt($(".pagination_mobile_numbers_overall2 span.active").html())-1;var lang=$(".pagination_mobile_overall").data("lang");$.ajax({url:domain_url+'ajax_scripts/get_text_search_results.php',type:'POST',data:{page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.escort_results!="")
{var title=document.title;title=title.replace(/(- [0-9]+|) \| HappyEscorts\.com/,data.page+" | HappyEscorts.com");document.title=title;$("#text_search_page").html(data.page);$("#text_search_content").html(data.escort_results);$("#slds_top").html('');$("#slds_top").html(data.slds_top);if(data.slds_top=="")$("#slds_top").addClass("hidden");else $("#slds_top").removeClass("hidden");$("#slds_bottom").html('');$.ajax({url:domain_url+'ajax_scripts/get_ads_bottom.php',type:'GET',dataType:'json'}).done(function(data)
{$("#slds_bottom").html(data.slds_bottom);if(data.slds_bottom=="")$("#slds_bottom").addClass("hidden");else $("#slds_bottom").removeClass("hidden");});$("html,body").scrollTop(0);}}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>An error occurred!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#text_search_content").on("click",".pagination_mobile_numbers_overall2 span",function()
{var page=parseInt($(this).attr("id").replace(/page/,""));var lang=$(".pagination_mobile_overall").data("lang");$.ajax({url:domain_url+'ajax_scripts/get_text_search_results.php',type:'POST',data:{page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.escort_results!="")
{var title=document.title;title=title.replace(/(- [0-9]+|) \| HappyEscorts\.com/,data.page+" | HappyEscorts.com");document.title=title;$("#text_search_page").html(data.page);$("#text_search_content").html(data.escort_results);$("#slds_top").html('');$("#slds_top").html(data.slds_top);if(data.slds_top=="")$("#slds_top").addClass("hidden");else $("#slds_top").removeClass("hidden");$("#slds_bottom").html('');$.ajax({url:domain_url+'ajax_scripts/get_ads_bottom.php',type:'GET',dataType:'json'}).done(function(data)
{$("#slds_bottom").html(data.slds_bottom);if(data.slds_bottom=="")$("#slds_bottom").addClass("hidden");else $("#slds_bottom").removeClass("hidden");});$("html,body").scrollTop(0);}}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>An error occurred!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#text_search_content").on("click",".pagination_mobile_next",function()
{var page=parseInt($(".pagination_mobile_numbers_overall2 span.active").html())+1;var lang=$(".pagination_mobile_overall").data("lang");$.ajax({url:domain_url+'ajax_scripts/get_text_search_results.php',type:'POST',data:{page:page,lang:lang},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.escort_results!="")
{var title=document.title;title=title.replace(/(- [0-9]+|) \| HappyEscorts\.com/,data.page+" | HappyEscorts.com");document.title=title;$("#text_search_page").html(data.page);$("#text_search_content").html(data.escort_results);$("#slds_top").html('');$("#slds_top").html(data.slds_top);if(data.slds_top=="")$("#slds_top").addClass("hidden");else $("#slds_top").removeClass("hidden");$("#slds_bottom").html('');$.ajax({url:domain_url+'ajax_scripts/get_ads_bottom.php',type:'GET',dataType:'json'}).done(function(data)
{$("#slds_bottom").html(data.slds_bottom);if(data.slds_bottom=="")$("#slds_bottom").addClass("hidden");else $("#slds_bottom").removeClass("hidden");});$("html,body").scrollTop(0);}}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>An error occurred!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if(($("#escorts_country_content").length>0||$("#escorts_city_content").length>0)&&$("#button_filter").length>0)
{if($("#escorts_country_show_more_cities").length>0)
{$("#escorts_country_show_more_cities").click(function()
{$("#escorts_country_more_cities").removeClass("hidden");$("#escorts_country_show_more_cities").addClass("hidden");$("#escorts_country_hide_more_cities").removeClass("hidden");});}
if($("#escorts_country_hide_more_cities").length>0)
{$("#escorts_country_hide_more_cities").click(function()
{$("#escorts_country_more_cities").addClass("hidden");$("#escorts_country_hide_more_cities").addClass("hidden");$("#escorts_country_show_more_cities").removeClass("hidden");});}
$("#button_filter").click(function()
{$("html,body").scrollTop(0);$("#dark_overlay").removeClass("hidden");$("#filter_overall").addClass("active");getNumbersForFilterOptionsCheckbox();});}
if($("#escorts_city_content").length>0&&$("#more_cities_link").length>0)
{$("#more_cities_link").click(function()
{$("html,body").addClass("noscroll");$("#overlay_more_cities").removeClass("hidden");$("#more_cities_overlay").removeClass("hidden");});$("#overlay_more_cities").click(function()
{$("#more_cities_overlay").addClass("hidden");$("#overlay_more_cities").addClass("hidden");$("html,body").removeClass("noscroll");});}
if($(".reviews_text_more span").length>0)
{$(".reviews_text_more span").click(function()
{$(".reviews_text_more").css("display","none");$(".reviews_text").css("height","auto");});}
if($("#reviews_country").length>0)
{$("#reviews_country").change(function()
{var country=parseInt($(this).val());if(country>=0)
{$.ajax({url:domain_url+'ajax_scripts/set_session_values.php',type:'POST',data:{reviews_country:country,reviews_city:0},dataType:'text'}).done(function(data)
{if(data=="ok")
{var href=window.location.href;window.location.href=href.replace(/\?limitstart=[0-9]+/,"");}});}});}
if($("#reviews_city").length>0)
{$("#reviews_city").change(function()
{var city=parseInt($(this).val());if(city>=0)
{$.ajax({url:domain_url+'ajax_scripts/set_session_values.php',type:'POST',data:{reviews_city:city},dataType:'text'}).done(function(data)
{if(data=="ok")
{var href=window.location.href;window.location.href=href.replace(/\?limitstart=[0-9]+/,"");}});}});}
if($(".quick_filters_overall").length>0||$("#location_search_content").length>0)
{$("main").on("change",".quick_filters_option input",function()
{var id=$(this).attr("id");var value=0;if($(this).is(":checked"))value=1;var filter=$(this).parent().data("filter");var tag=$(this).prop("tagName").toLowerCase();if(tag=="input")
{var tag2=$("#"+filter).prop("tagName").toLowerCase();if(tag2=="select")
{var filter_value=$(this).parent().data("value");$("#"+filter+" option[value="+filter_value+"]").prop("selected",true);$("#filter_submit_button").trigger("click");}
if(tag2=="input")
{var type=$("#"+filter).attr("type").toLowerCase();if(type=="checkbox")
{$("#"+filter).prop("checked",true);$("#filter_submit_button").trigger("click");}}}});}
if(true)
{$("main").on("click",".remove_filter_option",function()
{var filter_to_remove=$(this).attr("data-filter");var filter_key="";var new_filter_value="";var data_object={};if(filter_to_remove=="search_text")
{filter_key="filter_search_text";new_filter_value="";data_object[filter_key]=new_filter_value;data_object["filter_search_text_city_id"]="0";}
if(filter_to_remove=="range")return;if(filter_to_remove=="escort_type")
{filter_key="filter_escort_type";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val();else var escort_type="";escort_type.splice(escort_type.indexOf(current_filter_value),1);if(escort_type.length>0)new_filter_value=escort_type.join(",");data_object[filter_key]=new_filter_value;$("#filter_escort_type option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="gender")
{filter_key="filter_gender";new_filter_value="nothing";data_object[filter_key]=new_filter_value;$("#filter_gender").val("nothing");}
if(filter_to_remove=="age")
{filter_key="filter_age_min";new_filter_value="0";data_object[filter_key]=new_filter_value;filter_key="filter_age_max";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_age_min").val("0");$("#filter_age_max").val("0");}
if(filter_to_remove=="height")
{filter_key="filter_height_min";new_filter_value="0";data_object[filter_key]=new_filter_value;filter_key="filter_height_max";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_height_min").val("0");$("#filter_height_max").val("0");}
if(filter_to_remove=="body_type")
{filter_key="filter_body_type";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val();else var body_type="";body_type.splice(body_type.indexOf(current_filter_value),1);if(body_type.length>0)new_filter_value=body_type.join(",");data_object[filter_key]=new_filter_value;$("#filter_body_type option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="body_arts")
{filter_key="filter_body_arts";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val();else var body_arts="";body_arts.splice(body_arts.indexOf(current_filter_value),1);if(body_arts.length>0)new_filter_value=body_arts.join(",");data_object[filter_key]=new_filter_value;$("#filter_body_arts option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="bra_size")
{filter_key="filter_bra_size_letter";new_filter_value="ZERO";data_object[filter_key]=new_filter_value;$("#filter_bra_size_letter").val(new_filter_value);}
if(filter_to_remove=="silicone")
{filter_key="filter_silicone";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_silicone").prop("checked",false);}
if(filter_to_remove=="hair_color")
{filter_key="filter_hair_color";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val();else var hair_color="";hair_color.splice(hair_color.indexOf(current_filter_value),1);if(hair_color.length>0)new_filter_value=hair_color.join(",");data_object[filter_key]=new_filter_value;$("#filter_hair_color option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="shaved")
{filter_key="filter_shaved";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val();else var shaved="";shaved.splice(shaved.indexOf(current_filter_value),1);if(shaved.length>0)new_filter_value=shaved.join(",");data_object[filter_key]=new_filter_value;$("#filter_shaved option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="sexual_orientation")
{filter_key="filter_sexual_orientation";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val();else var sexual_orientation="";sexual_orientation.splice(sexual_orientation.indexOf(current_filter_value),1);if(sexual_orientation.length>0)new_filter_value=sexual_orientation.join(",");data_object[filter_key]=new_filter_value;$("#filter_sexual_orientation option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="smoker")
{filter_key="filter_smoker";new_filter_value="nothing";data_object[filter_key]=new_filter_value;$("#filter_smoker").val(new_filter_value);}
if(filter_to_remove=="ethnicity")
{filter_key="filter_ethnicity";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val();else var ethnicity="";ethnicity.splice(ethnicity.indexOf(current_filter_value),1);if(ethnicity.length>0)new_filter_value=ethnicity.join(",");data_object[filter_key]=new_filter_value;$("#filter_ethnicity option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="languages")
{filter_key="filter_languages";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val();else var languages="";languages.splice(languages.indexOf(current_filter_value),1);if(languages.length>0)new_filter_value=languages.join(",");data_object[filter_key]=new_filter_value;$("#filter_languages option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="available_to")
{filter_key="filter_available_to";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val();else var available_to="";available_to.splice(available_to.indexOf(current_filter_value),1);if(available_to.length>0)new_filter_value=available_to.join(",");data_object[filter_key]=new_filter_value;$("#filter_available_to option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="available_for")
{filter_key="filter_available_for";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val();else var available_for="";available_for.splice(available_for.indexOf(current_filter_value),1);if(available_for.length>0)new_filter_value=available_for.join(",");data_object[filter_key]=new_filter_value;$("#filter_available_for option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="available_today")
{filter_key="filter_available_today";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_available_today").prop("checked",false);}
if(filter_to_remove=="reviews")
{filter_key="filter_reviews";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_reviews").prop("checked",false);}
if(filter_to_remove=="duo_offer")
{filter_key="filter_duo_offer";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_duo_offer").prop("checked",false);}
if(filter_to_remove=="activities")
{filter_key="filter_activities";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val();else var activities="";activities.splice(activities.indexOf(current_filter_value),1);if(activities.length>0)new_filter_value=activities.join(",");data_object[filter_key]=new_filter_value;$("#filter_activities option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="price")
{filter_key="filter_price_min";new_filter_value="";data_object[filter_key]=new_filter_value;filter_key="filter_price_max";new_filter_value="";data_object[filter_key]=new_filter_value;filter_key="filter_currency";new_filter_value="nothing";data_object[filter_key]=new_filter_value;$("#filter_price_min").val("");$("#filter_price_max").val("");$("#filter_currency").val("nothing");}
if(filter_to_remove=="payment_accepted")
{filter_key="filter_payment_accepted";new_filter_value="";var current_filter_value=$(this).attr("data-value");if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val();else var payment_accepted="";payment_accepted.splice(payment_accepted.indexOf(current_filter_value),1);if(payment_accepted.length>0)new_filter_value=payment_accepted.join(",");data_object[filter_key]=new_filter_value;$("#filter_payment_accepted option[value="+current_filter_value+"]").prop("selected",false);}
if(filter_to_remove=="discount")
{filter_key="filter_discount";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_discount").prop("checked",false);}
if(filter_to_remove=="video")
{filter_key="filter_video";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_video").prop("checked",false);}
if(filter_to_remove=="verified")
{filter_key="filter_verified";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_verified").prop("checked",false);}
if(filter_to_remove=="online")
{filter_key="filter_online";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_online").prop("checked",false);}
if(filter_to_remove=="phone_verified")
{filter_key="filter_phone_verified";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_phone_verified").prop("checked",false);}
if(filter_to_remove=="new")
{filter_key="filter_new";new_filter_value="0";data_object[filter_key]=new_filter_value;$("#filter_new").prop("checked",false);}
if(Object.keys(data_object).length>0)
{$.ajax({url:domain_url+'ajax_scripts/set_session_values.php',type:'POST',data:data_object,dataType:'text'}).done(function(data){window.location.href=window.location.href;}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});}});}
if($("#filter_overall").length>0)
{$("#dark_overlay").click(function()
{$("#filter_overall").removeClass("active");setTimeout(function(){$("#dark_overlay").addClass("hidden");},400);});$("#filter_close").click(function()
{$("#filter_overall").removeClass("active");setTimeout(function(){$("#dark_overlay").addClass("hidden");},400);});if($("#filter_range").length>0)
{$("#filter_range").SumoSelect({csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true});$("#filter_range").on("sumo:opening",function()
{getNumbersForFilterOption("range");});$("#filter_range").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#filter_search_text").length>0)
{$("#filter_search_text").blur(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(search_text!="")$("#filter_search_text").parents(".filter_search_text").addClass("active");else $("#filter_search_text").parents(".filter_search_text").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
$("#filter_escort_type").SumoSelect({placeholder:$("#filter_escort_type").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_escort_type").on("sumo:opening",function()
{getNumbersForFilterOption("escort_type");});$("#filter_escort_type").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(escort_type!="")$("#filter_escort_type").parents(".filter_option").addClass("active");else $("#filter_escort_type").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_gender").SumoSelect({csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true});$("#filter_gender").on("sumo:opening",function()
{getNumbersForFilterOption("gender");});$("#filter_gender").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(gender!="nothing")$("#filter_gender").parents(".filter_option").addClass("active");else $("#filter_gender").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_age_min").SumoSelect({csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true});$("#filter_age_min").on("sumo:opening",function()
{getNumbersForFilterOption("age_min");});$("#filter_age_min").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(age_min!="0"||age_max!="0")$("#filter_age_min").parents(".filter_option").addClass("active");else $("#filter_age_min").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_age_max").SumoSelect({csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true});$("#filter_age_max").on("sumo:opening",function()
{getNumbersForFilterOption("age_max");});$("#filter_age_max").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(age_min!="0"||age_max!="0")$("#filter_age_min").parents(".filter_option").addClass("active");else $("#filter_age_min").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_height_min").SumoSelect({csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true});$("#filter_height_min").on("sumo:opening",function()
{getNumbersForFilterOption("height_min");});$("#filter_height_min").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(height_min!="0"||height_max!="0")$("#filter_height_min").parents(".filter_option").addClass("active");else $("#filter_height_min").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_height_max").SumoSelect({csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true});$("#filter_height_max").on("sumo:opening",function()
{getNumbersForFilterOption("height_max");});$("#filter_height_max").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(height_min!="0"||height_max!="0")$("#filter_height_min").parents(".filter_option").addClass("active");else $("#filter_height_min").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_body_type").SumoSelect({placeholder:$("#filter_body_type").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_body_type").on("sumo:opening",function()
{getNumbersForFilterOption("body_type");});$("#filter_body_type").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(body_type!="")$("#filter_body_type").parents(".filter_option").addClass("active");else $("#filter_body_type").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_body_arts").SumoSelect({placeholder:$("#filter_body_arts").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_body_arts").on("sumo:opening",function()
{getNumbersForFilterOption("body_arts");});$("#filter_body_arts").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(body_arts!="")$("#filter_body_arts").parents(".filter_option").addClass("active");else $("#filter_body_arts").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_bra_size_number").SumoSelect({csvDispCount:0,okCancelInMulti:true});$("#filter_bra_size_letter").SumoSelect({csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true});$("#filter_bra_size_letter").on("sumo:opening",function()
{getNumbersForFilterOption("bra_size_letter");});$("#filter_bra_size_letter").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
var set_active_class=false;if(bra_size_letter!="ZERO")set_active_class=true;if(set_active_class!="")$("#filter_bra_size_letter").parents(".filter_option").addClass("active");else $("#filter_bra_size_letter").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_silicone").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_hair_color").SumoSelect({placeholder:$("#filter_hair_color").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_hair_color").on("sumo:opening",function()
{getNumbersForFilterOption("hair_color");});$("#filter_hair_color").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(hair_color!="")$("#filter_hair_color").parents(".filter_option").addClass("active");else $("#filter_hair_color").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_shaved").SumoSelect({placeholder:$("#filter_shaved").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_shaved").on("sumo:opening",function()
{getNumbersForFilterOption("shaved");});$("#filter_shaved").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(shaved!="")$("#filter_shaved").parents(".filter_option").addClass("active");else $("#filter_shaved").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_sexual_orientation").SumoSelect({placeholder:$("#filter_sexual_orientation").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_sexual_orientation").on("sumo:opening",function()
{getNumbersForFilterOption("sexual_orientation");});$("#filter_sexual_orientation").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(sexual_orientation!="")$("#filter_sexual_orientation").parents(".filter_option").addClass("active");else $("#filter_sexual_orientation").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_smoker").SumoSelect({csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true});$("#filter_smoker").on("sumo:opening",function()
{getNumbersForFilterOption("smoker");});$("#filter_smoker").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(smoker!="nothing")$("#filter_smoker").parents(".filter_option").addClass("active");else $("#filter_smoker").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_ethnicity").SumoSelect({placeholder:$("#filter_ethnicity").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_ethnicity").on("sumo:opening",function()
{getNumbersForFilterOption("ethnicity");});$("#filter_ethnicity").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(ethnicity!="")$("#filter_ethnicity").parents(".filter_option").addClass("active");else $("#filter_ethnicity").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_languages").SumoSelect({placeholder:$("#filter_languages").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_languages").on("sumo:opening",function()
{getNumbersForFilterOption("languages");});$("#filter_languages").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(languages!="")$("#filter_languages").parents(".filter_option").addClass("active");else $("#filter_languages").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_available_to").SumoSelect({placeholder:$("#filter_available_to").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_available_to").on("sumo:opening",function()
{getNumbersForFilterOption("available_to");});$("#filter_available_to").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(available_to!="")$("#filter_available_to").parents(".filter_option").addClass("active");else $("#filter_available_to").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_available_for").SumoSelect({placeholder:$("#filter_available_for").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_available_for").on("sumo:opening",function()
{getNumbersForFilterOption("available_for");});$("#filter_available_for").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(available_for!="")$("#filter_available_for").parents(".filter_option").addClass("active");else $("#filter_available_for").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_available_today").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_reviews").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_duo_offer").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_activities").SumoSelect({placeholder:$("#filter_activities").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_activities").on("sumo:opening",function()
{getNumbersForFilterOption("activities");});$("#filter_activities").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(activities!="")$("#filter_activities").parents(".filter_option").addClass("active");else $("#filter_activities").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_price_min").keyup(function()
{var value=$(this).val().replace(/[^0-9]+/,"");$(this).val(value);});$("#filter_price_min").blur(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
var set_active_class=false;if(price_min!="")set_active_class=true;if(price_max!="")set_active_class=true;if(currency!="nothing")set_active_class=true;if(set_active_class)$("#filter_price_min").parents(".filter_option").addClass("active");else $("#filter_price_min").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_price_max").keyup(function()
{var value=$(this).val().replace(/[^0-9]+/,"");$(this).val(value);});$("#filter_price_max").blur(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
var set_active_class=false;if(price_min!="")set_active_class=true;if(price_max!="")set_active_class=true;if(currency!="nothing")set_active_class=true;if(set_active_class)$("#filter_price_min").parents(".filter_option").addClass("active");else $("#filter_price_min").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_currency").SumoSelect({csvDispCount:0,okCancelInMulti:true});$("#filter_currency").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
var set_active_class=false;if(price_min!="")set_active_class=true;if(price_max!="")set_active_class=true;if(currency!="nothing")set_active_class=true;if(set_active_class)$("#filter_price_min").parents(".filter_option").addClass("active");else $("#filter_price_min").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_payment_accepted").SumoSelect({placeholder:$("#filter_payment_accepted").data("placeholder"),csvDispCount:0,floatWidth:200,forceCustomRendering:true,okCancelInMulti:true,selectAll:true,locale:['OK','Cancel','Select/Unselect all']});$("#filter_payment_accepted").on("sumo:opening",function()
{getNumbersForFilterOption("payment_accepted");});$("#filter_payment_accepted").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}
if(payment_accepted!="")$("#filter_payment_accepted").parents(".filter_option").addClass("active");else $("#filter_payment_accepted").parents(".filter_option").removeClass("active");}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_discount").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_video").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_verified").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_online").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_phone_verified").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_new").change(function()
{var type="";var country_id=0;var city_id=0;var range=25;var lat=0;var lng=0;if($("#escorts_country_content").length>0)
{type="escorts_country";country_id=$("#escorts_country_content").data("country-id");}
if($("#escorts_city_content").length>0)
{type="escorts_city";city_id=$("#escorts_city_content").data("city-id");}
if($("#location_search_content").length>0)
{type="location_search";range=$("#filter_range").val();lat=$("#location_search_content").data("lat");lng=$("#location_search_content").data("lng");}
if($("#city_search_content").length>0)type="city_search";if($("#text_search_content").length>0)type="text_search";var search_text=$("#filter_search_text").val();if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.ajax({url:domain_url+'ajax_scripts/get_number_of_escorts_for_filter.php',type:'POST',data:{type:type,country_id:country_id,city_id:city_id,range:range,lat:lat,lng:lng,search_text:search_text,escort_type:escort_type,gender:gender,age_min:age_min,age_max:age_max,height_min:height_min,height_max:height_max,body_type:body_type,body_arts:body_arts,bra_size_letter:bra_size_letter,silicone:silicone,hair_color:hair_color,shaved:shaved,sexual_orientation:sexual_orientation,smoker:smoker,ethnicity:ethnicity,languages:languages,available_to:available_to,available_for:available_for,available_today:available_today,reviews:reviews,duo_offer:duo_offer,activities:activities,price_min:price_min,price_max:price_max,currency:currency,payment_accepted:payment_accepted,discount:discount,video:video,verified:verified,online:online,phone_verified:phone_verified,new:newc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#filter_number_of_escorts").html('('+data.number_of_escorts+')');getNumbersForFilterOptionsCheckbox();}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_more_criteria_button").click(function()
{if($("#filter_more_criteria").css("height")=="0px")
{$("#filter_more_criteria_button").html("<span>"+$("#hidden_filter_button_less_criteria").html()+"</span>");$("#filter_more_criteria").animate({height:$("#filter_more_criteria").get(0).scrollHeight},0);$("#filter_more_criteria .filter_option_select_filter").css("display","block");$("#filter_more_criteria .filter_option_double_select_filter").css("display","block");$("#filter_more_criteria .filter_option_input_select_filter").css("display","block");}
else
{$("html,body").scrollTop(0);$("#filter_more_criteria_button").html("<span>"+$("#hidden_filter_button_more_criteria").html()+"</span>");$("#filter_more_criteria .filter_option_select_filter").css("display","none");$("#filter_more_criteria .filter_option_double_select_filter").css("display","none");$("#filter_more_criteria .filter_option_input_select_filter").css("display","none");$("#filter_more_criteria").animate({height:"0px"},0);}});$("#filter_submit_button").click(function()
{var search_text=$("#filter_search_text").val();if($("#filter_range").length>0)var range=$("#filter_range").val();else var range="25";if($("#filter_escort_type").val()!=null)var escort_type=$("#filter_escort_type").val().join(",");else var escort_type="";var gender=$("#filter_gender").val();var age_min=$("#filter_age_min").val();var age_max=$("#filter_age_max").val();var height_min=$("#filter_height_min").val();var height_max=$("#filter_height_max").val();if($("#filter_body_type").val()!=null)var body_type=$("#filter_body_type").val().join(",");else var body_type="";if($("#filter_body_arts").val()!=null)var body_arts=$("#filter_body_arts").val().join(",");else var body_arts="";var bra_size_letter=$("#filter_bra_size_letter").val();var silicone='0';if($("#filter_silicone").is(":checked"))silicone='1';if($("#filter_hair_color").val()!=null)var hair_color=$("#filter_hair_color").val().join(",");else var hair_color="";if($("#filter_shaved").val()!=null)var shaved=$("#filter_shaved").val().join(",");else var shaved="";if($("#filter_sexual_orientation").val()!=null)var sexual_orientation=$("#filter_sexual_orientation").val().join(",");else var sexual_orientation="";var smoker=$("#filter_smoker").val();if($("#filter_ethnicity").val()!=null)var ethnicity=$("#filter_ethnicity").val().join(",");else var ethnicity="";if($("#filter_languages").val()!=null)var languages=$("#filter_languages").val().join(",");else var languages="";if($("#filter_available_to").val()!=null)var available_to=$("#filter_available_to").val().join(",");else var available_to="";if($("#filter_available_for").val()!=null)var available_for=$("#filter_available_for").val().join(",");else var available_for="";var available_today='0';if($("#filter_available_today").is(":checked"))available_today='1';var reviews='0';if($("#filter_reviews").is(":checked"))reviews='1';var duo_offer='0';if($("#filter_duo_offer").is(":checked"))duo_offer='1';if($("#filter_activities").val()!=null)var activities=$("#filter_activities").val().join(",");else var activities="";var price_min=$("#filter_price_min").val();var price_max=$("#filter_price_max").val();var currency=$("#filter_currency").val();if($("#filter_payment_accepted").val()!=null)var payment_accepted=$("#filter_payment_accepted").val().join(",");else var payment_accepted="";var discount='0';if($("#filter_discount").is(":checked"))discount='1';var video='0';if($("#filter_video").is(":checked"))video='1';var verified='0';if($("#filter_verified").is(":checked"))verified='2';var online='0';if($("#filter_online").is(":checked"))online='1';var phone_verified='0';if($("#filter_phone_verified").is(":checked"))phone_verified='1';var newc='0';if($("#filter_new").is(":checked"))newc='1';$.post(domain_url+'ajax_scripts/set_session_values.php',{filter_search_text:search_text,filter_range:range,filter_escort_type:escort_type,filter_gender:gender,filter_age_min:age_min,filter_age_max:age_max,filter_height_min:height_min,filter_height_max:height_max,filter_body_type:body_type,filter_body_arts:body_arts,filter_bra_size_letter:bra_size_letter,filter_silicone:silicone,filter_hair_color:hair_color,filter_shaved:shaved,filter_sexual_orientation:sexual_orientation,filter_smoker:smoker,filter_ethnicity:ethnicity,filter_languages:languages,filter_available_to:available_to,filter_available_for:available_for,filter_available_today:available_today,filter_reviews:reviews,filter_duo_offer:duo_offer,filter_activities:activities,filter_price_min:price_min,filter_price_max:price_max,filter_currency:currency,filter_payment_accepted:payment_accepted,filter_discount:discount,filter_video:video,filter_verified:verified,filter_online:online,filter_phone_verified:phone_verified,filter_new:newc,search_engine_page:1}).done(function(data)
{if($("#escorts_country_content").length>0||$("#escorts_city_content").length>0)
{if(true)
{var change_to_text_search=false;$("#search_suggestions li[data-group=city]").each(function()
{var city_name=$(this).text();var city_name_escaped=city_name.replace("(","\\(");city_name_escaped=city_name_escaped.replace(")","\\)");var reg_exp=new RegExp(city_name_escaped,"i");if(search_text.search(reg_exp)!=-1)
{change_to_text_search=true;return false;}});if(change_to_text_search)
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'text',search_engine_page:1,search_engine_last_pages:null}).done(function(data)
{var linktolocation=window.location.protocol+"//"+window.location.hostname+"/";if(site_language!="en")linktolocation+=site_language+"/";linktolocation+="escorts/search-engine";window.location.href=linktolocation;}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{var href=window.location.href;window.location.href=href.replace(/\?limitstart=[0-9]+/,"");}}
else
{var href=window.location.href;window.location.href=href.replace(/\?limitstart=[0-9]+/,"");}}
else
{window.location.href=window.location.href;}}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_reset_button").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{filter_search_text:'',filter_search_text_city_id:'0',filter_range:'25',filter_escort_type:'',filter_gender:'nothing',filter_age_min:'0',filter_age_max:'0',filter_height_min:'0',filter_height_max:'0',filter_body_type:'',filter_body_arts:'',filter_bra_size_letter:'ZERO',filter_silicone:'0',filter_hair_color:'',filter_shaved:'',filter_sexual_orientation:'',filter_smoker:'nothing',filter_ethnicity:'',filter_languages:'',filter_available_to:'',filter_available_for:'',filter_available_today:'0',filter_reviews:'0',filter_duo_offer:'0',filter_activities:'',filter_price_min:'',filter_price_max:'',filter_currency:'nothing',filter_payment_accepted:'',filter_discount:'0',filter_video:'0',filter_verified:'0',filter_online:'0',filter_phone_verified:'0',filter_new:'0'}).done(function(data)
{window.location.href=window.location.href;}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});$("#filter_back_button").click(function()
{$("#filter_close").trigger("click");});if($("#filter_location_search_button").length>0)
{$("#filter_location_search_button").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{search_engine_mode:'location',search_engine_page:1,search_engine_last_pages:null,filter_search_text:'',filter_search_text_city_id:'0',filter_range:'25',filter_escort_type:'',filter_gender:'nothing',filter_age_min:'0',filter_age_max:'0',filter_height_min:'0',filter_height_max:'0',filter_body_type:'',filter_bra_size_letter:'ZERO',filter_hair_color:'',filter_shaved:'',filter_sexual_orientation:'',filter_smoker:'nothing',filter_ethnicity:'',filter_languages:'',filter_available_to:'',filter_available_for:'',filter_available_today:'0',filter_reviews:'0',filter_duo_offer:'0',filter_activities:'',filter_price_min:'',filter_price_max:'',filter_currency:'nothing',filter_payment_accepted:'',filter_discount:'0',filter_video:'0',filter_verified:'0',filter_online:'0',filter_phone_verified:'0',filter_new:'0'}).done(function(data)
{var linktolocation=window.location.protocol+"//"+window.location.hostname+"/";if(site_language!="en")linktolocation+=site_language+"/";linktolocation+="escorts/search-engine";window.location.href=linktolocation;}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}}
if($("#slider_escort").length>0)
{$("#slider_escort").on("setPosition",function(slick)
{var images=$("#slider_escort .slick-track .slick-slide").length;var minus=0;if(images==2)minus=105;if(images==3)minus=210;if(minus>0)
{var css=$("#slider_escort .slick-track").css("transform");var hits=css.match(/[0-9]{3,}/);var old_pos=parseInt(hits[0]);var new_pos=old_pos-minus;css=css.replace(old_pos,new_pos);$("#slider_escort .slick-track").css("transform",css);}});$("#slider_escort").slick({slidesToShow:3,centerMode:true,variableWidth:true,arrows:true,dots:false,autoplay:false,autoplaySpeed:5000,speed:100,responsive:[{breakpoint:1030,settings:{arrows:false}}]});}
if($(".swiper-container").length>0)
{if($(".swiper-container img.swiper-lazy").length>1)var loop=true;else var loop=false;var mySwiper=new Swiper(".swiper-container",{preloadImages:false,lazy:{loadPrevNext:true},pagination:{el:'.swiper-pagination',type:'progressbar'},navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'},breakpointsInverse:true,breakpoints:{490:{slidesPerView:2,spaceBetween:30},740:{slidesPerView:3,spaceBetween:30},980:{slidesPerView:4,spaceBetween:30}}});}
if($(".award_title_only_for_he").length>0)
{}
if($("#button_call.nli").length>0)
{$("#button_call.nli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq2="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$("#button_call.nli").data("href");});}});}
else
{var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq2="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$("#button_call.nli").data("href");}});}
if($("#button_call_bar.nli").length>0)
{$("#button_call_bar.nli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq2="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$("#button_call_bar.nli").data("href");});}});}
else
{var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq2="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$("#button_call_bar.nli").data("href");}});}
if($(".whatsapp.nli").length>0)
{$(".whatsapp.nli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq3="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$(".whatsapp.nli").data("href");});}});}
else
{var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq3="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$(".whatsapp.nli").data("href");}});}
if($(".viber.nli").length>0)
{$(".viber.nli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq4="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$(".viber.nli").data("href");});}});}
else
{var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq4="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$(".viber.nli").data("href");}});}
if($(".sms.nli").length>0)
{$(".sms.nli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq5="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$(".sms.nli").data("href");});}});}
else
{var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq5="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$(".sms.nli").data("href");}});}
if($(".telegram.nli").length>0)
{$(".telegram.nli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq6="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$(".telegram.nli").data("href");});}});}
else
{var ts=Math.round(new Date().getTime()/1000);var es=$("#contact_form_escort_sedcard").data("escort-id");document.cookie="conreq6="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";window.location.href=$(".telegram.nli").data("href");}});}
if($("#button_call.mli").length>0)
{$("#button_call.mli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:2,id:id}).done(function(data){window.location.href=$("#button_call.mli").data("href")});}});}});}
else
{var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:2,id:id}).done(function(data){window.location.href=$("#button_call.mli").data("href")});}}});}
if($("#button_call_bar.mli").length>0)
{$("#button_call_bar.mli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:2,id:id}).done(function(data){window.location.href=$("#button_call_bar.mli").data("href")});}});}});}
else
{var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:2,id:id}).done(function(data){window.location.href=$("#button_call_bar.mli").data("href")});}}});}
if($(".whatsapp.mli").length>0)
{$(".whatsapp.mli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:3,id:id}).done(function(data){window.location.href=$(".whatsapp.mli").data("href")});}});}});}
else
{var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:3,id:id}).done(function(data){window.location.href=$(".whatsapp.mli").data("href")});}}});}
if($(".viber.mli").length>0)
{$(".viber.mli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:4,id:id}).done(function(data){window.location.href=$(".viber.mli").data("href")});}});}});}
else
{var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:4,id:id}).done(function(data){window.location.href=$(".viber.mli").data("href")});}}});}
if($(".sms.mli").length>0)
{$(".sms.mli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:5,id:id}).done(function(data){window.location.href=$(".sms.mli").data("href")});}});}});}
else
{var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:5,id:id}).done(function(data){window.location.href=$(".sms.mli").data("href")});}}});}
if($(".telegram.mli").length>0)
{$(".telegram.mli").click(function(e)
{if(getCookie('scam_notice_modal')===null)
{$.fancybox.open('<div class="toast_message warning"><span class="h2">'+$("#hidden_modal_contact_pre_payment_hint_title").html()+'</span><p>'+$("#hidden_modal_contact_pre_payment_hint_text").html()+'</p></div>',{afterShow:function(instance,current)
{$(current.$content).find("#choice_button_ok").on("click touchend",function()
{instance.close();var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{document.cookie="scam_notice_modal=read; max-age=31536000; path=/; domain=.happyescorts.com; secure";$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:6,id:id}).done(function(data){window.location.href=$(".telegram.mli").data("href")});}});}});}
else
{var id=parseInt($("#contact_form_escort_sedcard").data("escort-id"));if(id>0)
{$.post(domain_url+'ajax_scripts/insert_contact_request.php',{type:6,id:id}).done(function(data){window.location.href=$(".telegram.mli").data("href")});}}});}
if($("#heart_add_remove_favourite").length>0)
{$("#heart_add_remove_favourite").click(function()
{if(!$("#heart_add_remove_favourite .plus").hasClass("hidden"))
{$("#button_add_favourite").trigger("click");}
else
{$("#button_remove_favourite").trigger("click");}});}
if($("#button_add_favourite").length>0)
{$("#button_add_favourite").click(function()
{var esc=$("#contact_form_escort_sedcard").data("escort-id");$.ajax({url:domain_url+'ajax_scripts/add_favourite.php',type:'POST',data:{escort:esc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".favourites .number").removeClass("hidden");$(".favourites .number span").html(data.number);$("#button_add_favourite").addClass("hidden");$("#button_remove_favourite").removeClass("hidden");$("#heart_add_remove_favourite .plus").addClass("hidden");$("#heart_add_remove_favourite .minus").removeClass("hidden");$.fancybox.open($("#hidden_escort_sedcard_toast_message_add_favourite_success").html());}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#button_remove_favourite").length>0)
{$("#button_remove_favourite").click(function()
{var esc=$("#contact_form_escort_sedcard").data("escort-id");$.ajax({url:domain_url+'ajax_scripts/remove_favourite.php',type:'POST',data:{escort:esc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.number==0)$(".favourites .number").addClass("hidden");$(".favourites .number span").html(data.number);$("#button_remove_favourite").addClass("hidden");$("#button_add_favourite").removeClass("hidden");$("#heart_add_remove_favourite .minus").addClass("hidden");$("#heart_add_remove_favourite .plus").removeClass("hidden");$.fancybox.open($("#hidden_escort_sedcard_toast_message_remove_favourite_success").html());}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($(".card_escort_picture .remove").length>0)
{$(".card_escort_picture .remove").each(function()
{$(this).click(function()
{var esc=$(this).data("escort-id");$.ajax({url:domain_url+'ajax_scripts/remove_favourite.php',type:'POST',data:{escort:esc},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.number==0)$(".favourites .number").addClass("hidden");$(".favourites .number span").html(data.number);$("#remove"+esc).parent().parent().remove();$.fancybox.open($("#hidden_escort_sedcard_toast_message_remove_favourite_success").html());}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});});}
if($("#contact_form_escort_sedcard").length>0)
{}
$("#company").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#company").blur(function()
{$(this).removeClass("bc_orange");});$("#vat_id").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#vat_id").blur(function()
{$(this).removeClass("bc_orange");});$("#website").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#website").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#name").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#name").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#address").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#address").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#zip_code").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#zip_code").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#city").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#city").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#country").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#country").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#phone").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#phone").blur(function()
{$(this).removeClass("bc_orange");if($("#register_affiliate_form").length>0&&$(this).val()=="")$(this).addClass("bc_red");});$("#fax").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#fax").blur(function()
{$(this).removeClass("bc_orange");});$("#email").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#email").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#email_verify").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#email_verify").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#password").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#password").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#password_verify").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#password_verify").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#password_repeat").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#password_repeat").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#message").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#message").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("input[name=type]").change(function()
{if($(this).is(":checked"))$("#register_form .radios").removeClass("b_red");});$("input[name=terms]").change(function()
{if($(this).is(":checked"))$(this).next().removeClass("bc_red");});$("input[name=age]").change(function()
{if($(this).is(":checked"))$(this).next().removeClass("bc_red");});$("#contact_form").on("submit",function(e)
{e.preventDefault();var ready_to_execute=true;var na=$("#name").val();var em=$("#email").val();var ph=$("#phone").val();var me=$("#message").val();if(na=="")
{$("#name").addClass("bc_red");ready_to_execute=false;}
if(em=="")
{$("#email").addClass("bc_red");ready_to_execute=false;}
if(me=="")
{$("#message").addClass("bc_red");ready_to_execute=false;}
if(ready_to_execute)
{if($("#contact_form").data("status")!="sending")
{$("#contact_form").data("status","sending");$.getScript("https://www.google.com/recaptcha/api.js?render=6LctA8AUAAAAAMWHMpW1zuPXfOq-BzRzj2x-UFjT",function()
{grecaptcha.ready(function()
{grecaptcha.execute('6LctA8AUAAAAAMWHMpW1zuPXfOq-BzRzj2x-UFjT',{action:'homepage'}).then(function(token)
{$("#contact_form").data("grecaptcha_token",token);var ca=$("#contact_form").data("grecaptcha_token");$("#name").removeClass("bc_red");$("#email").removeClass("bc_red");$("#message").removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/execute_contact.php',type:'POST',data:{name:na,email:em,phone:ph,message:me,captcha:ca},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#name").val("");$("#email").val("");$("#phone").val("");$("#message").val("");$.fancybox.open('<div class="toast_message success">'+$("#hidden_contact_toast_message_success").html()+'</div>');}
if(data.result=="warning")
{$.fancybox.open('<div class="toast_message warning">'+$("#hidden_"+data.text).html()+'</div>');}
if(data.result=="error")
{$.fancybox.open(data.text);}
$("#contact_form").data("status","");}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$("#contact_form").data("status","");});});});});}}
else
{$.fancybox.open('<div class="toast_message warning">'+$("#hidden_contact_toast_message_missing_data").html()+'</div>');}});$("#contact_form_escort_sedcard").on("submit",function(e)
{e.preventDefault();var ready_to_execute=true;var dev="";var es=$("#contact_form_escort_sedcard").data("escort-id");var na=$("#name").val();var em=$("#email").val();var ph=$("#phone").val();var me=$("#message").val();if(window.location.search=="?blubi=1")
{}
else
{}
var te=0;if(na=="")
{$("#name").addClass("bc_red");ready_to_execute=false;}
if(em=="")
{$("#email").addClass("bc_red");ready_to_execute=false;}
if(me=="")
{$("#message").addClass("bc_red");ready_to_execute=false;}
if(ready_to_execute)
{if($("#contact_form_escort_sedcard").data("status")!="sending")
{$("#contact_form_escort_sedcard").data("status","sending");$.getScript("https://www.google.com/recaptcha/api.js?render=6LctA8AUAAAAAMWHMpW1zuPXfOq-BzRzj2x-UFjT",function()
{grecaptcha.ready(function()
{grecaptcha.execute('6LctA8AUAAAAAMWHMpW1zuPXfOq-BzRzj2x-UFjT',{action:'homepage'}).then(function(token)
{$("#contact_form_escort_sedcard").data("grecaptcha_token",token);var ca=$("#contact_form_escort_sedcard").data("grecaptcha_token");$("#name").removeClass("bc_red");$("#email").removeClass("bc_red");$("#message").removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/execute_contact_escort_sedcard'+dev+'.php',type:'POST',data:{escort_id:es,name:na,email:em,phone:ph,message:me,captcha:ca,test:te,language:site_language},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#name").val("");$("#email").val("");$("#phone").val("");$("#message").val("");var ts=Math.round(new Date().getTime()/1000);document.cookie="conreq1="+ts+"|"+es+"; max-age=31536000; path=/; domain=.happyescorts.com; secure";var html_text=$("#hidden_escort_sedcard_contact_toast_message_success").html();var chat_link_text=$("#hidden_escort_sedcard_contact_toast_message_success_chat_link").html();var code_link='<br/><br/><a href="'+data.code_link+'" target="_blank" style="font-size: 1.4em;">'+chat_link_text+'</a>';html_text=html_text.replace(/\{CODE_LINK\}/,code_link);$.fancybox.open('<div class="toast_message success">'+html_text+'</div>');gtag('event','send-contact',{'event_category':'contact','event_label':'escort-contact-email'});}
if(data.result=="warning")
{$.fancybox.open('<div class="toast_message warning">'+$("#hidden_"+data.text).html()+'</div>');}
if(data.result=="error")
{$.fancybox.open(data.text);}
$("#contact_form_escort_sedcard").data("status","");}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$("#contact_form_escort_sedcard").data("status","");});});});});}}
else
{$.fancybox.open('<div class="toast_message warning">'+$("#hidden_escort_sedcard_contact_toast_message_missing_data").html()+'</div>');}});$("#button_mail_me").click(function()
{$("#contact_form_escort_sedcard_overall").slideToggle("slow",function()
{$("html,body").scrollTop($("#contact_form_escort_sedcard_overall").offset().top-100);$("#button_mail_me").addClass("hidden");});});$("#contact_form_escort_sedcard .close_scam_notice").click(function()
{var u1=domain_url;var u2="ajax_scripts/";var u3="set_cookie_scam_notice.";var u4="php";$.ajax({url:u1+u2+u3+u4,type:'POST',data:{},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#contact_form_escort_sedcard .close_scam_notice").parent().parent().remove();}});});$(".escort_data_overall > .escort_data_content > .contact_row > .note_close > .close_scam_notice").click(function()
{var u1=domain_url;var u2="ajax_scripts/";var u3="set_cookie_scam_notice.";var u4="php";$.ajax({url:u1+u2+u3+u4,type:'POST',data:{},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".escort_data_overall > .escort_data_content > .contact_row > .note_close > .close_scam_notice").parent().parent().remove();}});});if($(".review_entry_edit").length>0)
{$("#reviews_overall").on("click",".review_entry_edit",function()
{var id=$(this).attr("id").replace(/review_entry_edit/,"");var es=$("#contact_form_escort_sedcard").data("escort-id");$.ajax({url:domain_url+'ajax_scripts/get_review.php',type:'POST',data:{id:id,escort_id:es},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".review_form_overall").data("mode","edit");$(".review_form_overall").data("edit",id);$("#review_caption").val(data.caption);$("#review_text").val(data.text);$("#review_rating").data("rating",data.rating);for(var i=1;i<=parseInt(data.rating);i++)
{$("#star"+i+" use").attr("xlink:href","#star-full");}
for(var j=(parseInt(data.rating)+1);j<=5;j++)
{$("#star"+j+" use").attr("xlink:href","#star-empty");}
$("html,body").scrollTop($(".review_form_overall").offset().top-50);}});});}
if($(".review_entry_delete").length>0)
{$("#reviews_overall").on("click",".review_entry_delete",function()
{var id=$(this).attr("id").replace(/review_entry_delete/,"");var es=$("#contact_form_escort_sedcard").data("escort-id");if(confirm($("#hidden_escort_sedcard_reviews_confirm_delete_review").text()))
{$.ajax({url:domain_url+'ajax_scripts/delete_review.php',type:'POST',data:{id:id,escort_id:es},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{var counter_reviews=parseInt($(".review_date_overall").first().parent().prev().find("span.counter_reviews").text());counter_reviews--;$(".review_date_overall").first().parent().prev().find("span.counter_reviews").text(counter_reviews);var counter=1;$(".review_date_overall").first().parent().prev().find("svg").each(function()
{var count=1/0.25;var average_rating=(Math.floor(data.average_rating*count)/count);if(average_rating>=counter)
{$(this).find("use").last().attr("xlink:href","#star-full");}
else
{if((average_rating-(counter-1))==0.75)
{$(this).find("use").last().attr("xlink:href","#star-three-quarter");}
if((average_rating-(counter-1))==0.5)
{$(this).find("use").last().attr("xlink:href","#star-half");}
if((average_rating-(counter-1))==0.25)
{$(this).find("use").last().attr("xlink:href","#star-quarter");}
if((average_rating-(counter-1))<=0)$(this).find("use").last().attr("xlink:href","#star-empty");}
counter++;});$(".review_date_overall").first().parent().prev().find("span.rating span").html(data.average_rating);var once_at_day=$("#review_entry_delete"+id).parent().parent().next().hasClass("review_date_overall");if(once_at_day)$("#review_entry_delete"+id).parent().parent().prev().remove();$("#review_entry_delete"+id).parent().parent().remove();if(!$(".review_button_more_overall").hasClass("hidden"))
{$("#reviews_overall .review_entry_overall.hidden").first().prev(".review_date_overall").removeClass("hidden");$("#reviews_overall .review_entry_overall.hidden").first().removeClass("hidden");if($("#reviews_overall .review_entry_overall.hidden").length==0)$(".review_button_more_overall").addClass("hidden");}}});}});}
if($(".review_entry_answer").length>0)
{$("#reviews_overall").on("click",".review_entry_answer",function()
{var id=$(this).attr("id").replace(/review_entry_answer/,"");$(".review_answer_form_overall").data("mode","create");$(".review_answer_form_overall").data("edit",0);$("#review_answer_review").val(id).removeAttr("disabled");$("#review_answer_caption").val("").focus();$("#review_answer_text").val("");$("html,body").scrollTop($(".review_answer_form_overall").offset().top-50);});}
$("#button_more_reviews").click(function()
{if($("#reviews_overall .review_entry_overall.hidden").length>=3)
{$("#reviews_overall .review_entry_overall.hidden").slice(0,3).each(function()
{$(this).prev(".review_date_overall").removeClass("hidden");$(this).removeClass("hidden");$(this).next(".review_answer_overall").removeClass("hidden");});$("#reviews_overall").data("shown",parseInt($("#reviews_overall").data("shown"))+3);}
else
{$("#reviews_overall .review_entry_overall.hidden").each(function()
{$(this).prev(".review_date_overall").removeClass("hidden");$(this).removeClass("hidden");$(this).next(".review_answer_overall").removeClass("hidden");});$("#reviews_overall").data("shown",parseInt($("#reviews_overall").data("shown"))+3);$("#button_more_reviews").addClass("hidden");}});if($("#review_login_member").length>0)
{$("#review_login_member").click(function()
{$.fancybox.open($("#user_login_form_html"),{afterShow:function(instance,current)
{$(current.$content).find("#user_login_submit").on("click touchend",function()
{var email=$(current.$content).find("#login_email").val();var password=$(current.$content).find("#login_password").val();$.ajax({url:domain_url+'ajax_scripts/user_login'+'.php',type:'POST',data:{email:email,password:password},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{window.location.reload();}
if(data.result=="no_complete_data")
{$(current.$content).find("#user_login_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#user_login_message").html($("#hidden_user_login_message_no_data_entered").html());}
if(data.result=="incorrect_data")
{$(current.$content).find("#user_login_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#user_login_message").html($("#hidden_user_login_message_incorrect_data").html());}
if(data.result=="warning")
{$(current.$content).find("#user_login_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#user_login_message").html($("#hidden_user_login_fail").html());}
if(data.result=="error")
{$(current.$content).find("#user_login_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#user_login_message").html(data.text);}}).fail(function()
{$(current.$content).find("#user_login_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#user_login_message").html('Connection error!');});});}});});}
$("#review_caption").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#review_caption").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#review_text").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#review_text").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#review_rating svg").each(function()
{$(this).hover(function()
{var id=parseInt($(this).attr("id").replace(/star/,""));var href=$(this).find("use").attr("xlink:href");for(var i=1;i<=id;i++)
{$("#star"+i+" use").attr("xlink:href","#star-full");}
for(var j=(id+1);j<=5;j++)
{$("#star"+j+" use").attr("xlink:href","#star-empty");}},function()
{var rating=parseInt($(this).parent().data("rating"));for(var i=1;i<=5;i++)
{$("#star"+i+" use").attr("xlink:href","#star-empty");}
if(rating>0)
{for(var j=1;j<=rating;j++)
{$("#star"+j+" use").attr("xlink:href","#star-full");}}});$(this).on("click touchend",function()
{var id=parseInt($(this).attr("id").replace(/star/,""));$(this).parent().data("rating",id);$(this).parent().attr("data-rating",id);for(var i=1;i<=id;i++)
{$("#star"+i+" use").attr("xlink:href","#star-full");}
for(var j=(id+1);j<=5;j++)
{$("#star"+j+" use").attr("xlink:href","#star-empty");}
$("#review_rating").removeClass("bc_red");});});$("#button_submit_review").click(function()
{var ready_to_execute=true;var mo=$(".review_form_overall").data("mode");var ed=$(".review_form_overall").data("edit");var es=$("#contact_form_escort_sedcard").data("escort-id");var ca=$("#review_caption").val();var te=$("#review_text").val();var ra=parseInt($("#review_rating").data("rating"));if(ca=="")
{$("#review_caption").addClass("bc_red");ready_to_execute=false;}
if(te=="")
{$("#review_text").addClass("bc_red");ready_to_execute=false;}
if(ra==0)
{$("#review_rating").addClass("bc_red");ready_to_execute=false;}
if(ready_to_execute)
{if($(".review_form_overall").data("status")!="sending")
{$(".review_form_overall").data("status","sending");$("#review_caption").removeClass("bc_red");$("#review_text").removeClass("bc_red");$("#review_rating").removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/save_review.php',type:'POST',data:{mode:mo,edit:ed,escort_id:es,caption:ca,text:te,rating:ra},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".review_form_overall").data("mode","create");$(".review_form_overall").data("edit",0);$("#review_caption").val("");$("#review_text").val("");for(var i=1;i<=5;i++)
{$("#star"+i+" use").attr("xlink:href","#star-empty");}
$("#review_rating").attr("data-rating",0);if(mo=="create")
{var current_date_object=new Date();var current_date=String(current_date_object.getDate()).padStart(2,"0")+"."+String(current_date_object.getMonth()+1).padStart(2,"0")+"."+current_date_object.getFullYear();var last_date=$(".escort_data_content .review_date_overall").first().find(".review_date").text();if(current_date!=last_date)
{var new_date_overall='<div class="review_date_overall"><div class="review_date">'+current_date+'</div></div>';$(".review_date_overall").first().before(new_date_overall);}
var counter_reviews=parseInt($(".review_date_overall").first().parent().prev().find("span.counter_reviews").text());counter_reviews++;$(".review_date_overall").first().parent().prev().find("span.counter_reviews").text(counter_reviews);var counter=1;$(".review_date_overall").first().parent().prev().find("svg").each(function()
{var count=1/0.25;var average_rating=(Math.floor(data.average_rating*count)/count);if(average_rating>=counter)
{$(this).find("use").last().attr("xlink:href","#star-full");}
else
{if((average_rating-(counter-1))==0.75)
{$(this).find("use").last().attr("xlink:href","#star-three-quarter");}
if((average_rating-(counter-1))==0.5)
{$(this).find("use").last().attr("xlink:href","#star-half");}
if((average_rating-(counter-1))==0.25)
{$(this).find("use").last().attr("xlink:href","#star-quarter");}
if((average_rating-(counter-1))<=0)$(this).find("use").last().attr("xlink:href","#star-empty");}
counter++;});$(".review_date_overall").first().parent().prev().find("span.rating span").html(data.average_rating);var new_entry_overall='<div class="review_entry_overall">';new_entry_overall+='<div class="review_entry_caption_overall">';new_entry_overall+='<span class="review_entry_caption notranslate">'+ca+'</span><br/>';new_entry_overall+='<span class="review_entry_from">'+data.from+' <span class="notranslate">'+data.member+'</span></span><br/>';new_entry_overall+='<span class="review_entry_rating">';for(var i=1;i<=ra;i++)
{new_entry_overall+='<svg style="width: 20px; height: 20px; vertical-align: middle;"><use xlink:href="#star-full"></use></svg>';}
for(var j=(ra+1);j<=5;j++)
{new_entry_overall+='<svg style="width: 20px; height: 20px; vertical-align: middle;"><use xlink:href="#star-empty"></use></svg>';}
new_entry_overall+='</span>';new_entry_overall+='</div>';new_entry_overall+='<div class="review_entry_text">';new_entry_overall+='<span class="text notranslate">'+te.replace(/\n/,"</br>")+'</span>';new_entry_overall+='<span id="review_entry_edit'+data.insert_id+'"  class="review_entry_edit">';new_entry_overall+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="20" height="20" x="0" y="0" viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g xmlns="http://www.w3.org/2000/svg"><path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" fill="#000000"></path></g></svg>';new_entry_overall+='</span>';new_entry_overall+='</div>';new_entry_overall+='</div>';$(".review_date_overall").first().after(new_entry_overall);if(!$(".review_button_more_overall").hasClass("hidden"))
{$("#reviews_overall .review_entry_overall:not(.hidden)").last().prev(".review_date_overall").addClass("hidden");$("#reviews_overall .review_entry_overall:not(.hidden)").last().addClass("hidden");}
else
{var shown_reviews=parseInt($("#reviews_overall .review_entry_overall").length);var shown=parseInt($("#reviews_overall").data("shown"));if(shown_reviews==shown)
{$("#reviews_overall .review_entry_overall:not(.hidden)").last().prev(".review_date_overall").addClass("hidden");$("#reviews_overall .review_entry_overall:not(.hidden)").last().addClass("hidden");$(".review_button_more_overall").removeClass("hidden");}}}
if(mo=="edit"&&ed>0)
{var counter=1;$("#review_entry_edit"+ed).parent().parent().parent().prev().find("svg").each(function()
{var count=1/0.25;var average_rating=(Math.floor(data.average_rating*count)/count);if(average_rating>=counter)
{$(this).find("use").last().attr("xlink:href","#star-full");}
else
{if((average_rating-(counter-1))==0.75)
{$(this).find("use").last().attr("xlink:href","#star-three-quarter");}
if((average_rating-(counter-1))==0.5)
{$(this).find("use").last().attr("xlink:href","#star-half");}
if((average_rating-(counter-1))==0.25)
{$(this).find("use").last().attr("xlink:href","#star-quarter");}
if((average_rating-(counter-1))<=0)$(this).find("use").last().attr("xlink:href","#star-empty");}
counter++;});$("#review_entry_edit"+ed).parent().parent().parent().prev().find("span.rating span").html(data.average_rating);$("#review_entry_edit"+ed).parent().prev().find(".review_entry_caption").html(ca);$("#review_entry_edit"+ed).parent().find(".text").html(te.replace(/\n/,"</br>"));counter=1;$("#review_entry_edit"+ed).parent().prev().find(".review_entry_rating svg").each(function()
{if(counter<=ra)
{$(this).find("use").attr("xlink:href","#star-full");}
else
{$(this).find("use").attr("xlink:href","#star-empty");}
counter++;});}
$.fancybox.open(data.text);}
if(data.result=="warning")
{$.fancybox.open(data.text);}
if(data.result=="error")
{$.fancybox.open(data.text);}
$(".review_form_overall").data("status","");}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$(".review_form_overall").data("status","");});}}});if($(".review_answer_edit").length>0)
{$("#reviews_overall").on("click",".review_answer_edit",function()
{var id=$(this).attr("id").replace(/review_answer_edit/,"");var es=$("#contact_form_escort_sedcard").data("escort-id");$.ajax({url:domain_url+'ajax_scripts/get_review_answer.php',type:'POST',data:{id:id,escort_id:es},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".review_answer_form_overall").data("mode","edit");$(".review_answer_form_overall").data("edit",id);$("#review_answer_review").val(data.review).attr("disabled","disabled");$("#review_answer_caption").val(data.caption).focus();$("#review_answer_text").val(data.text);$("html,body").scrollTop($(".review_answer_form_overall").offset().top-50);}});});}
if($(".review_answer_delete").length>0)
{$("#reviews_overall").on("click",".review_answer_delete",function()
{var id=$(this).attr("id").replace(/review_answer_delete/,"");var es=$("#contact_form_escort_sedcard").data("escort-id");if(confirm($("#hidden_escort_sedcard_reviews_confirm_delete_review_answer").text()))
{$.ajax({url:domain_url+'ajax_scripts/delete_review_answer.php',type:'POST',data:{id:id,escort_id:es},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#review_answer_delete"+id).parent().parent().remove();}});}});}
$("#review_answer_review").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#review_answer_review").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="0")$(this).addClass("bc_red");});$("#review_answer_caption").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#review_answer_caption").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#review_answer_text").focus(function()
{$(this).removeClass("bc_red").addClass("bc_orange");});$("#review_answer_text").blur(function()
{$(this).removeClass("bc_orange");if($(this).val()=="")$(this).addClass("bc_red");});$("#button_submit_review_answer").click(function()
{var ready_to_execute=true;var mo=$(".review_answer_form_overall").data("mode");var ed=$(".review_answer_form_overall").data("edit");var es=$("#contact_form_escort_sedcard").data("escort-id");var re=parseInt($("#review_answer_review").val());var ca=$("#review_answer_caption").val();var te=$("#review_answer_text").val();if(re==0)
{$("#review_answer_review").addClass("bc_red");ready_to_execute=false;}
if(ca=="")
{$("#review_answer_caption").addClass("bc_red");ready_to_execute=false;}
if(te=="")
{$("#review_answer_text").addClass("bc_red");ready_to_execute=false;}
if(ready_to_execute)
{if($(".review_answer_form_overall").data("status")!="sending")
{$(".review_answer_form_overall").data("status","sending");$("#review_answer_review").removeClass("bc_red");$("#review_answer_caption").removeClass("bc_red");$("#review_answer_text").removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/save_review_answer.php',type:'POST',data:{mode:mo,edit:ed,escort_id:es,review:re,caption:ca,text:te},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".review_answer_form_overall").data("mode","create");$(".review_answer_form_overall").data("edit",0);$("#review_answer_review").val(0).removeAttr("disabled");$("#review_answer_caption").val("");$("#review_answer_text").val("");if(mo=="create")
{var new_answer_overall='<div class="review_answer_overall">';new_answer_overall+='<div class="review_answer_caption_overall">';new_answer_overall+='<span class="review_answer_caption notranslate">'+ca+'</span><br/>';new_answer_overall+='<span class="review_answer_from">'+data.from+' <span class="notranslate">'+data.escort+'</span></span>';new_answer_overall+='</div>';new_answer_overall+='<div class="review_answer_text">';new_answer_overall+='<span class="text notranslate">'+te.replace(/\n/,"</br>")+'</span>';new_answer_overall+='<span id="review_answer_edit'+data.insert_id+'"  class="review_answer_edit">';new_answer_overall+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g xmlns="http://www.w3.org/2000/svg"><path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" fill="#666"></path></g></svg>';new_answer_overall+='</span>';new_answer_overall+='</div>';new_answer_overall+='</div>';$(".review_entry_overall[data-id="+re+"]").after(new_answer_overall);}
if(mo=="edit"&&ed>0)
{$("#review_answer_edit"+ed).parent().prev().find(".review_answer_caption").html(ca);$("#review_answer_edit"+ed).parent().find(".text").html(te.replace(/\n/,"<br/>"));}
$.fancybox.open(data.text);}
if(data.result=="warning")
{$.fancybox.open(data.text);}
if(data.result=="error")
{$.fancybox.open(data.text);}
$(".review_answer_form_overall").data("status","");}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$(".review_answer_form_overall").data("status","");});}}});if($("#unsubscribe_no_login_in_long_time").length>0)
{$("#unsubscribe_no_login_in_long_time").click(function()
{var co=$("#unsubscribe_no_login_in_long_time").data("code");$.ajax({url:domain_url+'ajax_scripts/set_status_email_notification.php',type:'POST',data:{type:'no_login_in_long_time',code:co},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$.fancybox.open('<div class="toast_message success"><span class="h2">Successfully unsubscribed</span><p>Email successfully unsubscribed!</p></div>');}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Error</span><p>Processing error!</p></div>');}
if(data.result=="wrong_code")
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Wrong Code</span><p>The code is wrong!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#unsubscribe_escort_of_the_week_hint").length>0)
{$("#unsubscribe_escort_of_the_week_hint").click(function()
{var co=$("#unsubscribe_escort_of_the_week_hint").data("code");$.ajax({url:domain_url+'ajax_scripts/set_status_email_notification.php',type:'POST',data:{type:'escort_of_the_week_hint',code:co},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$.fancybox.open('<div class="toast_message success"><span class="h2">Successfully unsubscribed</span><p>Email successfully unsubscribed!</p></div>');}
if(data.result=="error")
{$.fancybox.open('<div class="toast_message error"><span class="h2">Error</span><p>Processing error!</p></div>');}
if(data.result=="wrong_code")
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Wrong Code</span><p>The code is wrong!</p></div>');}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#share").length>0)
{$("#share").click(function()
{$.fancybox.open($("#share_html"));});}
if($("#report_fake").length>0)
{$("#report_fake").click(function()
{$.fancybox.open($("#report_fake_form_html"),{afterShow:function(instance,current)
{$(current.$content).find("#report_fake_submit").on("click touchend",function()
{var escort_id=$("#contact_form_escort_sedcard").data("escort-id");var email=$(current.$content).find("#email2").val();var message=$(current.$content).find("#message2").val();$.getScript("https://www.google.com/recaptcha/api.js?render=6LctA8AUAAAAAMWHMpW1zuPXfOq-BzRzj2x-UFjT",function()
{grecaptcha.ready(function()
{grecaptcha.execute('6LctA8AUAAAAAMWHMpW1zuPXfOq-BzRzj2x-UFjT',{action:'homepage'}).then(function(token)
{$("#report_fake_form").data("grecaptcha_token",token);var ca=$("#report_fake_form").data("grecaptcha_token");$.ajax({url:domain_url+'ajax_scripts/report_fake'+'.php',type:'POST',data:{escort_id:escort_id,email:email,message:message,captcha:ca},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(current.$content).find("#report_fake_message").removeClass("c_red").addClass("c_green");$(current.$content).find("#report_fake_message").html($("#hidden_escort_sedcard_report_fake_success").html());$(current.$content).find("#email2").val("");$(current.$content).find("#message2").val("");}
if(data.result=="no_complete_data")
{$(current.$content).find("#report_fake_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#report_fake_message").html($("#hidden_escort_sedcard_report_fake_message_no_data_entered").html());}
if(data.result=="warning")
{$(current.$content).find("#report_fake_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#report_fake_message").html($("#hidden_escort_sedcard_report_fake_fail").html());}
if(data.result=="error")
{$(current.$content).find("#report_fake_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#report_fake_message").html(data.text);}}).fail(function()
{$(current.$content).find("#report_fake_message").removeClass("c_green").addClass("c_red");$(current.$content).find("#report_fake_message").html('Connection error!');});});});});});}});});}
if($(".sticky_contact_bar_overall").length==0)
{$("body").removeClass("page_escort_sedcard");}
if($(".sticky_contact_bar_picture").length>0)
{$(".sticky_contact_bar_picture").click(function()
{if($("div.slick-slide[data-slick-index=0] img").length>0)
{$("div.slick-slide[data-slick-index]").each(function()
{var slick_index=$(this).attr("data-slick-index");if(slick_index>-1)
{if($(this).children(".magnifier_plus").length==1)
{$(this).children("img").trigger("click");return false;}}});}
else
{$(".swiper-wrapper .swiper-slide .magnifier_plus").first().prev().trigger("click");}});}
$("#toogle_contact_options").click(function()
{if($(this).hasClass("only_he_messenger"))
{if(!$("#button_mail_me").hasClass("hidden"))
{$("html,body").scrollTop($("#contact_form_escort_sedcard_overall").offset().top-100);$("#button_mail_me").trigger("click");}
else
{$("html,body").scrollTop($("#contact_form_escort_sedcard_overall").offset().top-100);}}
else
{if($("#sticky_contact_options_overall").height()==0)
{$("#sticky_contact_options_overall").animate({height:$("#sticky_contact_options_overall")[0].scrollHeight+'px'},1000);}
else
{$("#sticky_contact_options_overall").animate({height:'0'},1000);}}});if($("#go_to_he_messenger").length>0)
{$("#go_to_he_messenger").click(function()
{if(!$("#button_mail_me").hasClass("hidden"))
{$("html,body").scrollTop($("#contact_form_escort_sedcard_overall").offset().top-100);$("#button_mail_me").trigger("click");}
else
{$("html,body").scrollTop($("#contact_form_escort_sedcard_overall").offset().top-100);}});}
if($("span[id^=review_more_text]").length>0)
{$("span[id^=review_more_text]").each(function()
{$(this).click(function()
{var id=parseInt($(this).attr("id").replace(/review_more_text/,""));$.fancybox.open($("#review_full_text"+id));});});}
if($("#register_form").length>0)
{$("input[name=type]").change(function(){var value=$(this).val();if(value==1||value==2)
{$("#name_span").css("display","none");}
else
{$("#name_span").css("display","inline");}
if(value==1)
{$("#aps_span").css("display","none");$("#trafficking").parent().css("display","none");$("#trafficking").prop("checked",true);$(".register_row .text").parent().css("display","none");}
else
{$("#aps_span").css("display","inline");$("#trafficking").parent().css("display","block");$("#trafficking").prop("checked",false);$(".register_row .text").parent().css("display","block");}});}
$("#register_form").on("submit",function(e)
{e.preventDefault();var ready_to_execute=true;var ty=(typeof $("input[name=type]:checked").val()!=="undefined"?parseInt($("input[name=type]:checked").val()):0);var na=$("#name").val();var em=$("#email").val();var ev=$("#email_verify").val();var pw=$("#password").val();var pv=$("#password_verify").val();var rt=$("#recaptcha_token").val();var te=0;if($("#terms").is(":checked"))te=1;var ag=0;if($("#age").is(":checked"))ag=1;var tr=0;if($("#trafficking").is(":checked"))tr=1;if(ty==0)
{$("#register_form .radios").addClass("b_red");ready_to_execute=false;}
if(na=="")
{$("#name").addClass("bc_red");ready_to_execute=false;}
if(em=="")
{$("#email").addClass("bc_red");ready_to_execute=false;}
if(ev=="")
{$("#email_verify").addClass("bc_red");ready_to_execute=false;}
if(pw=="")
{$("#password").addClass("bc_red");ready_to_execute=false;}
if(pv=="")
{$("#password_verify").addClass("bc_red");ready_to_execute=false;}
if(rt=="")
{$(".g-recaptcha").addClass("bc_red");ready_to_execute=false;}
if(te==0)
{$("#terms").next().addClass("bc_red");ready_to_execute=false;}
if(ag==0)
{$("#age").next().addClass("bc_red");ready_to_execute=false;}
if(tr==0)
{$("#trafficking").next().addClass("bc_red");ready_to_execute=false;}
if(ready_to_execute)
{if($("#register_form").data("status")!="sending")
{$("#register_form").data("status","sending");$("#register_form .radios").removeClass("b_red");$("#name").removeClass("bc_red");$("#email").removeClass("bc_red");$("#email_verify").removeClass("bc_red");$("#password").removeClass("bc_red");$("#password_verify").removeClass("bc_red");$(".g-recaptcha").removeClass("bc_red");$("#terms").next().removeClass("bc_red");$("#age").next().removeClass("bc_red");$("#trafficking").next().removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/user_register'+'.php',type:'POST',data:{type:ty,name:na,email:em,email_verify:ev,password:pw,password_verify:pv,recaptcha_token:rt,terms:te,age:ag,trafficking:tr,language:site_language},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("input[name=type]").prop("checked",false);$("#name").val("");$("#email").val("");$("#email_verify").val("");$("#password").val("");$("#password_verify").val("");$("#recaptcha_token").val("");$("#register_form").parent().prev().prev().text($("#hidden_register_form_success_caption").html());$("#register_form").parent().html($("#hidden_register_form_success_text").html());$("html,body").scrollTop(0);}
if(data.result=="no_complete_data")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_no_complete_data").html());}
if(data.result=="email_in_use")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_email_in_use").html());}
if(data.result=="email_invalid")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_email_invalid").html());}
if(data.result=="email_exists")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_email_exists").html());}
if(data.result=="emails_do_not_match")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_emails_do_not_match").html());}
if(data.result=="email_result_risky")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_email_result_risky").html());}
if(data.result=="email_result_invalid")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_email_result_invalid").html());}
if(data.result=="password_too_short")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_password_too_short").html());}
if(data.result=="passwords_do_not_match")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_passwords_do_not_match").html());}
if(data.result=="wrong_captcha")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_wrong_captcha").html());}
if(data.result=="fail")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_fail").html());}
$("#register_form").data("status","");}).fail(function()
{$("#register_form .message").removeClass("c_green").addClass("c_red").html('Connection error!');$("#register_form").data("status","");});}}
else
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_form_message_no_complete_data").html());}});$("#register_affiliate_form").on("submit",function(e)
{e.preventDefault();var ready_to_execute=true;var com=$("#company").val();var vi=$("#vat_id").val();var we=$("#website").val();var na=$("#name").val();var ad=$("#address").val();var zc=$("#zip_code").val();var ci=$("#city").val();var co=$("#country").val();var ph=$("#phone").val();var fa=$("#fax").val();var em=$("#email").val();var ev=$("#email_verify").val();var pw=$("#password").val();var pv=$("#password_verify").val();var rt=$("#recaptcha_token").val();if(we=="")
{$("#website").addClass("bc_red");ready_to_execute=false;}
if(na=="")
{$("#name").addClass("bc_red");ready_to_execute=false;}
if(ad=="")
{$("#address").addClass("bc_red");ready_to_execute=false;}
if(zc=="")
{$("#zip_code").addClass("bc_red");ready_to_execute=false;}
if(ci=="")
{$("#city").addClass("bc_red");ready_to_execute=false;}
if(co=="")
{$("#country").addClass("bc_red");ready_to_execute=false;}
if(ph=="")
{$("#phone").addClass("bc_red");ready_to_execute=false;}
if(em=="")
{$("#email").addClass("bc_red");ready_to_execute=false;}
if(ev=="")
{$("#email_verify").addClass("bc_red");ready_to_execute=false;}
if(pw=="")
{$("#password").addClass("bc_red");ready_to_execute=false;}
if(pv=="")
{$("#password_verify").addClass("bc_red");ready_to_execute=false;}
if(rt=="")
{$(".g-recaptcha").addClass("bc_red");ready_to_execute=false;}
if(ready_to_execute)
{if($("#register_affiliate_form").data("status")!="sending")
{$("#register_affiliate_form").data("status","sending");$("#website").removeClass("bc_red");$("#name").removeClass("bc_red");$("#address").removeClass("bc_red");$("#zip_code").removeClass("bc_red");$("#city").removeClass("bc_red");$("#country").removeClass("bc_red");$("#phone").removeClass("bc_red");$("#email").removeClass("bc_red");$("#email_verify").removeClass("bc_red");$("#password").removeClass("bc_red");$("#password_verify").removeClass("bc_red");$(".g-recaptcha").removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/user_register_affiliate'+'.php',type:'POST',data:{company:com,vat_id:vi,website:we,name:na,address:ad,zip_code:zc,city:ci,country:co,phone:ph,fax:fa,email:em,email_verify:ev,password:pw,password_verify:pv,recaptcha_token:rt},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#company").val("");$("#vat_id").val("");$("#website").val("");$("#name").val("");$("#address").val("");$("#zip_code").val("");$("#city").val("");$("#country").val("");$("#phone").val("");$("#fax").val("");$("#email").val("");$("#email_verify").val("");$("#password").val("");$("#password_verify").val("");$("#recaptcha_token").val("");$("#register_affiliate_form").parent().prev().prev().text($("#hidden_register_affiliate_form_success_caption").html());$("#register_affiliate_form").parent().html($("#hidden_register_affiliate_form_success_text").html());$("html,body").scrollTop(0);}
if(data.result=="no_complete_data")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_no_complete_data").html());}
if(data.result=="email_in_use")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_email_in_use").html());}
if(data.result=="email_invalid")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_email_invalid").html());}
if(data.result=="email_exists")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_email_exists").html());}
if(data.result=="emails_do_not_match")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_emails_do_not_match").html());}
if(data.result=="email_result_risky")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_email_result_risky").html());}
if(data.result=="email_result_invalid")
{$("#register_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_email_result_invalid").html());}
if(data.result=="password_too_short")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_password_too_short").html());}
if(data.result=="passwords_do_not_match")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_passwords_do_not_match").html());}
if(data.result=="wrong_captcha")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_wrong_captcha").html());}
if(data.result=="fail")
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_fail").html());}
$("#register_affiliate_form").data("status","");}).fail(function()
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html('Connection error!');$("#register_affiliate_form").data("status","");});}}
else
{$("#register_affiliate_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_register_affiliate_form_message_no_complete_data").html());}});$("#login_form").on("submit",function(e)
{e.preventDefault();var ready_to_execute=true;var em=$("#email").val();var pw=$("#password").val();if(em=="")
{$("#email").addClass("bc_red");ready_to_execute=false;}
if(pw=="")
{$("#password").addClass("bc_red");ready_to_execute=false;}
if(ready_to_execute)
{if($("#login_form").data("status")!="sending")
{$("#login_form").data("status","sending");$("#email").removeClass("bc_red");$("#password").removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/user_login'+'.php',type:'POST',data:{email:em,password:pw,language:site_language},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#email").val("");$("#password").val("");var referer=$("#login_form").data("referer");if(data.type=="escort")
{window.location.href=domain_url+(site_language!="en"?site_language+"/":"")+"user/profile";}
else
{if(referer!="")window.location.href=referer;else window.location.href=domain_url+(site_language!="en"?site_language+"/":"");}}
if(data.result=="no_complete_data")
{$("#login_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_user_login_message_no_data_entered").html());}
if(data.result=="incorrect_data")
{$("#login_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_user_login_message_incorrect_data").html());}
if(data.result=="not_verified")
{$("#login_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_user_login_message_not_verified").html());}
if(data.result=="block")
{$("#login_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_user_login_message_block").html());}
if(data.result=="warning")
{$("#login_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_user_login_fail").html());}
$("#login_form").data("status","");}).fail(function()
{$("#login_form .message").removeClass("c_green").addClass("c_red").html('Connection error!');$("#login_form").data("status","");});}}
else
{$("#login_form .message").removeClass("c_green").addClass("c_red").html($("#hidden_user_login_message_no_data_entered").html());}});$("#reset_password_form1").on("submit",function(e)
{e.preventDefault();var ready_to_execute=true;var em=$("#email").val();if(em=="")
{$("#email").addClass("bc_red");ready_to_execute=false;}
if(ready_to_execute)
{if($("#reset_password_form1").data("status")!="sending")
{$("#reset_password_form1").data("status","sending");$("#email").removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/user_reset_password1'+'.php',type:'POST',data:{email:em},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#email").val("");$("#reset_password_form1").parent().html($("#hidden_reset_password1_success").html());$("html,body").scrollTop(0);}
if(data.result=="no_complete_data")
{$("#reset_password_form1 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password1_message_no_complete_data").html());}
if(data.result=="email_invalid")
{$("#reset_password_form1 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password1_message_email_invalid").html());}
if(data.result=="fail")
{$("#reset_password_form1 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password1_message_fail").html());}
$("#reset_password_form1").data("status","");}).fail(function()
{$("#reset_password_form1 .message").removeClass("c_green").addClass("c_red").html('Connection error!');$("#reset_password_form1").data("status","");});}}
else
{$("#reset_password_form1 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password1_message_no_complete_data").html());}});$("#reset_password_form2").on("submit",function(e)
{e.preventDefault();var ready_to_execute=true;var em=$("#email").val();var pw=$("#password").val();var pr=$("#password_repeat").val();var to=$("#token").val();if(em=="")
{$("#email").addClass("bc_red");ready_to_execute=false;}
if(pw=="")
{$("#password").addClass("bc_red");ready_to_execute=false;}
if(pr=="")
{$("#password_repeat").addClass("bc_red");ready_to_execute=false;}
if(to=="")
{ready_to_execute=false;}
if(ready_to_execute)
{if($("#reset_password_form2").data("status")!="sending")
{$("#reset_password_form2").data("status","sending");$("#email").removeClass("bc_red");$("#password").removeClass("bc_red");$("#password_repeat").removeClass("bc_red");$.ajax({url:domain_url+'ajax_scripts/user_reset_password2'+'.php',type:'POST',data:{email:em,password:pw,password_repeat:pr,token:to},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#email").val("");$("#password").val("");$("#password_repeat").val("");$("#token").val("");$("#reset_password_form2").parent().html($("#hidden_reset_password2_success").html());$("html,body").scrollTop(0);}
if(data.result=="no_complete_data")
{$("#reset_password_form2 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password2_message_no_complete_data").html());}
if(data.result=="user_invalid")
{$("#reset_password_form2 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password2_message_user_invalid").html());}
if(data.result=="password_too_short")
{$("#reset_password_form2 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password2_message_password_too_short").html());}
if(data.result=="passwords_do_not_match")
{$("#reset_password_form2 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password2_message_passwords_do_not_match").html());}
if(data.result=="fail")
{$("#reset_password_form2 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password2_message_fail").html());}
$("#reset_password_form2").data("status","");}).fail(function()
{$("#reset_password_form2 .message").removeClass("c_green").addClass("c_red").html('Connection error!');$("#reset_password_form2").data("status","");});}}
else
{$("#reset_password_form2 .message").removeClass("c_green").addClass("c_red").html($("#hidden_reset_password2_message_no_complete_data").html());}});if($("#dashboard_available_today").length>0)
{$("#dashboard_available_today").change(function()
{var id=$(this).parent().parent().data("escort-id");var value="0";if($("#dashboard_available_today").is(":checked"))value="1";$.ajax({url:domain_url+'ajax_scripts/toggle_status_available_today'+'.php',type:'POST',data:{escort_id:id,value:value},dataType:'json'}).done(function(data)
{}).fail(function()
{$.fancybox.open('<div class="toast_message error"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
$(".accordion_question").each(function()
{$(this).click(function()
{$(this).toggleClass("active");var answer=$(this).next();if(answer[0].style.maxHeight)
{answer[0].style.maxHeight=null;answer[0].style.display="none";}
else
{answer[0].style.display="block";answer[0].style.maxHeight=answer[0].scrollHeight+"px";}});});if(window.location.hash!="")
{var regexes=new Array('#visitor[0-9]+','#escort[0-9]+','#agency[0-9]+','#week[0-9]+','#vip[0-9]+');var hash=window.location.hash;var found_hash=false;for(var i=0;i<regexes.length;i++)
{if(hash.search(regexes[i])!=-1)found_hash=true;}
if(found_hash)
{$(hash).trigger("click");}}
if($("#verify_account").length>0)
{$.fancybox.open('<div class="toast_message success" style="width: 90%; min-height: 25%;"><span class="h2">'+$("#verify_account h1").text()+'</span><p>'+$("#verify_account .block_content").html()+'</p></div>');}
if($("#phone_number").length>0)
{$("#phone_number").keyup(function()
{var value=$(this).val();$(this).val(value.replace(/[^0-9]+/,""));});}
if($("#button_send_sms").length>0)
{$("#button_send_sms").click(function()
{if($(this).data("status-sending")!="1")
{$(this).data("status-sending","1");var code=$(this).data("code");var country_code=$("#country_code").val();var phone_number=$("#phone_number").val();$.ajax({url:domain_url+'ajax_scripts/send_verification_sms.php',type:'POST',data:{code:code,country_code:country_code,phone_number:phone_number},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$.fancybox.open($("#hidden_"+data.text).html());$("#button_send_sms").data("status-sending","0");}
if(data.result=="warning")
{$.fancybox.open($("#hidden_"+data.text).html());$("#button_send_sms").data("status-sending","0");}
if(data.result=="error")
{$.fancybox.open(data.text);$("#button_send_sms").data("status-sending","0");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$("#button_send_sms").data("status-sending","0");});}});}
if($("#button_send_sms_twilio").length>0)
{if(getCookie("sttrida")===null)
{sms_twilio_tries_data=[0,0];}
else
{sms_twilio_tries_data=getCookie("sttrida");sms_twilio_tries_data=sms_twilio_tries_data.split(",");sms_twilio_tries_data[0]=parseInt(sms_twilio_tries_data[0]);sms_twilio_tries_data[1]=parseInt(sms_twilio_tries_data[1]);if(sms_twilio_tries_data[1]>0)
{sms_twilio_counter=setInterval(smsTwilioCounter,1000);}}
$("#button_send_sms_twilio").click(function()
{if($(this).data("status-sending")!="1")
{$(this).data("status-sending","1");$.fancybox.open($("#hidden_verify_account_phone_send_sms_loading").html());var code=$(this).data("code");var country_code=$("#country_code").val();var phone_number=$("#phone_number").val();$.ajax({url:domain_url+'ajax_scripts/send_verification_sms_twilio.php',type:'POST',data:{code:code,country_code:country_code,phone_number:phone_number},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.sent==1)
{sms_twilio_id=data.sms_id;sms_twilio_tries_data[0]++;if(sms_twilio_tries_data[0]==1)sms_twilio_tries_data[1]=30;if(sms_twilio_tries_data[0]==2)sms_twilio_tries_data[1]=60;document.cookie="sttrida="+sms_twilio_tries_data[0]+","+sms_twilio_tries_data[1]+"; max-age: 86400; path=/; domain=m.happyescorts.com; secure";sms_twilio_callback_check_counter=0;sms_twilio_callback_check=setInterval(smsTwilioCallbackCheck,1000);}
else
{$.fancybox.close();var modal_text=$("#hidden_"+data.text).html();if(data.text=="verify_account_phone_send_sms_already_sent")
{var link_phone=domain_url+(site_language!="en"?site_language+"/":"")+"account-activation-voice-"+code;modal_text=modal_text.replace("{LINK_PHONE}",link_phone);}
$.fancybox.open(modal_text);$("#button_send_sms_twilio").data("status-sending","0");}}
if(data.result=="warning")
{$.fancybox.close();var modal_text=$("#hidden_"+data.text).html();if(data.text=="verify_account_phone_send_sms_twilio_wrong_number")
{var country_code_without_plus=country_code.replace("+","");var regexp=new RegExp("^"+country_code_without_plus);if(phone_number.search(regexp)!=-1)
{var phone=country_code_without_plus;phone+="<span style=\"color: #A00;\">";phone+=phone_number.substr(0,country_code_without_plus.length);phone+="</span>";phone+=phone_number.substr(country_code_without_plus.length);modal_text=modal_text.replace("{PHONE}",phone);var modal_text_addon=$("#hidden_"+data.text_addon).html();modal_text_addon=modal_text_addon.replace("{WRONG_DIGITS}",country_code_without_plus);modal_text=modal_text.replace(/<\/p>/,modal_text_addon+"</p>");}
else
{modal_text=modal_text.replace("{PHONE}",country_code+phone_number);}}
if(data.text=="verify_account_phone_send_sms_twilio_not_allowed")
{var link_phone=domain_url+(site_language!="en"?site_language+"/":"")+"account-activation-voice-"+code;modal_text=modal_text.replace("{LINK_PHONE}",link_phone);}
$.fancybox.open(modal_text);$("#button_send_sms_twilio").data("status-sending","0");}
if(data.result=="error")
{$.fancybox.close();$.fancybox.open(data.text);$("#button_send_sms_twilio").data("status-sending","0");}}).fail(function()
{$.fancybox.close();$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$("#button_send_sms_twilio").data("status-sending","0");});}});}
if($("#button_send_voice_twilio").length>0)
{$("#button_send_voice_twilio").click(function()
{if($(this).data("status-sending")!="1")
{$(this).data("status-sending","1");$.fancybox.open($("#hidden_verify_account_phone_send_voice_loading").html());var code=$(this).data("code");var country_code=$("#country_code").val();var phone_number=$("#phone_number").val();var lang_code=$("#lang_code").val();$.ajax({url:domain_url+'ajax_scripts/send_verification_voice_twilio.php',type:'POST',data:{code:code,country_code:country_code,phone_number:phone_number,lang_code:lang_code},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.sent==1)
{voice_twilio_id=data.call_id;voice_twilio_callback_check_counter=0;voice_twilio_callback_check=setInterval(voiceTwilioCallbackCheck,1000);}
else
{$.fancybox.close();$.fancybox.open($("#hidden_"+data.text).html());$("#button_send_voice_twilio").data("status-sending","0");}}
if(data.result=="warning")
{$.fancybox.close();var modal_text=$("#hidden_"+data.text).html();if(data.text=="verify_account_phone_send_sms_twilio_wrong_number")
{var country_code_without_plus=country_code.replace("+","");var regexp=new RegExp("^"+country_code_without_plus);if(phone_number.search(regexp)!=-1)
{var phone=country_code_without_plus;phone+="<span style=\"color: #A00;\">";phone+=phone_number.substr(0,country_code_without_plus.length);phone+="</span>";phone+=phone_number.substr(country_code_without_plus.length);modal_text=modal_text.replace("{PHONE}",phone);var modal_text_addon=$("#hidden_"+data.text_addon).html();modal_text_addon=modal_text_addon.replace("{WRONG_DIGITS}",country_code_without_plus);modal_text=modal_text.replace(/<\/p>/,modal_text_addon+"</p>");}
else
{modal_text=modal_text.replace("{PHONE}",country_code+phone_number);}}
$.fancybox.open(modal_text);$("#button_send_voice_twilio").data("status-sending","0");}
if(data.result=="error")
{$.fancybox.close();$.fancybox.open(data.text);$("#button_send_voice_twilio").data("status-sending","0");}}).fail(function()
{$.fancybox.close();$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$("#button_send_voice_twilio").data("status-sending","0");});}});}
if($("#button_send_whatsapp").length>0)
{$("#button_send_whatsapp").click(function()
{if($(this).data("status-sending")!="1")
{$(this).data("status-sending","1");var code=$(this).data("code");var country_code=$("#country_code").val();var phone_number=$("#phone_number").val();$.ajax({url:domain_url+'ajax_scripts/send_verification_whatsapp.php',type:'POST',data:{code:code,country_code:country_code,phone_number:phone_number},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{var modal_text=$("#hidden_"+data.text).html();if(data.text=="verify_account_phone_send_whatsapp_already_sent")
{modal_text=modal_text.replace("{PHONE}",country_code+phone_number);}
$.fancybox.open(modal_text);$("#button_send_whatsapp").data("status-sending","0");}
if(data.result=="warning")
{var modal_text=$("#hidden_"+data.text).html();if(data.text=="verify_account_phone_send_whatsapp_has_not_whatsapp")
{if(data.text_addon===undefined)
{modal_text=modal_text.replace("{PHONE}",country_code+phone_number);}
else
{var country_code_without_plus=country_code.replace("+","");var regexp=new RegExp("^"+country_code_without_plus);if(phone_number.search(regexp)!=-1)
{var phone=country_code_without_plus;phone+="<span style=\"color: #A00;\">";phone+=phone_number.substr(0,country_code_without_plus.length);phone+="</span>";phone+=phone_number.substr(country_code_without_plus.length);modal_text=modal_text.replace("{PHONE}",phone);var modal_text_addon=$("#hidden_"+data.text_addon).html();modal_text_addon=modal_text_addon.replace("{WRONG_DIGITS}",country_code_without_plus);modal_text=modal_text.replace(/<\/p>/,modal_text_addon+"</p>");}
else
{modal_text=modal_text.replace("{PHONE}",country_code+phone_number);}}}
$.fancybox.open(modal_text);$("#button_send_whatsapp").data("status-sending","0");}
if(data.result=="error")
{$.fancybox.open(data.text);$("#button_send_whatsapp").data("status-sending","0");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$("#button_send_whatsapp").data("status-sending","0");});}});}
if($("#sms_code").length>0)
{$("#sms_code").keyup(function()
{var value=$(this).val();$(this).val(value.replace(/[^0-9]+/,""));});}
if($("#button_verify_sms_code").length>0)
{$("#button_verify_sms_code").click(function()
{if($(this).data("status-sending")!="1")
{$(this).data("status-sending","1");var code="";if($("#button_send_sms").length>0)code=$("#button_send_sms").data("code");if($("#button_send_sms_twilio").length>0)code=$("#button_send_sms_twilio").data("code");if($("#button_send_voice_twilio").length>0)code=$("#button_send_voice_twilio").data("code");if($("#button_send_whatsapp").length>0)code=$("#button_send_whatsapp").data("code");var sms_code=$("#sms_code").val();$.ajax({url:domain_url+'ajax_scripts/verify_user_per_sms_code.php',type:'POST',data:{code:code,sms_code:sms_code},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#phone_number").val("");$("#sms_code").val("");$("#verify_form").addClass("hidden");$("#verify_result").removeClass("hidden");$("#verify_account_phone h1").html(data.text);$("html,body").scrollTop(0);$("#button_verify_sms_code").data("status-sending","0");}
if(data.result=="error")
{$.fancybox.open(data.text);$("#button_verify_sms_code").data("status-sending","0");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');$("#button_verify_sms_code").data("status-sending","0");});}});}
if($("#verify_select_type").length>0)
{$("#verify_select_type").click(function()
{var ty=$("#type").val();$.post(domain_url+'ajax_scripts/set_session_values.php',{verify_type:ty}).done(function(data)
{window.location.reload();}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#verify_select_escort").length>0)
{$("#verify_select_escort").click(function()
{var eid=$("#escort").val();$.post(domain_url+'ajax_scripts/set_session_values.php',{verify_escort_id:eid}).done(function(data)
{window.location.reload();}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#verify_reset_escort").length>0)
{$("#verify_reset_escort").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{verify_type:0,verify_escort_id:0}).done(function(data)
{window.location.reload();}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#verify_country").length>0)
{$("#verify_country").change(function()
{$(this).removeClass("bc_red");$(this).parent().next().html('');});}
if($("#verify_type").length>0)
{$("#verify_type").change(function()
{$(this).removeClass("bc_red");$(this).parent().next().html('');});}
if($("#verify_month").length>0)
{$("#verify_month").change(function()
{$(this).removeClass("bc_red");$(this).parent().next().html('');});}
if($("#verify_year").length>0)
{$("#verify_year").change(function()
{$(this).removeClass("bc_red");$(this).parent().next().html('');});}
if($("#verify_expiry_date").length>0)
{if(site_language=='de')
{$.extend(true,$.datePicker.defaults.strings,{months:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],days:['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']});}
var input=$("#verify_expiry_date");input.attr("autocomplete","off");$("#verify_expiry_date").click(function()
{var ed=input.val();var widget=$.datePicker.api.show({element:input,views:{month:{show:ed,selected:[ed],firstDayOfWeek:1}},callbacks:{onHide:function(calendar)
{if($("#verify_expiry_date").val()!="")
{$("#verify_expiry_date").removeClass("bc_red");$("#verify_expiry_date").parent().next().html('');}}}});input.data("widget",widget);});}
if($("#verify_first_name").length>0)
{$("#verify_first_name").blur(function()
{if($("#verify_first_name").val()!="")
{$(this).removeClass("bc_red");$(this).parent().next().html('');}});}
if($("#verify_picture_modal").length>0)
{$("#verify_picture_modal").imgPicker({url:domain_url+'ajax_scripts/upload_verify_picture_escort.php',crop:false,minSize:[100,100],uploadSuccess:function(image)
{$("#verify_picture_overall img").prop("src",image.url+"?tm="+(new Date()).getTime());$("#verify_picture_overall img").removeClass("bc_red");$("#verify_picture_overall .picture_message").html('');$("#verify_picture_upload").addClass("hidden");$("#verify_picture_delete").removeClass("hidden");this.modal("hide");},deleteComplete:function()
{this.modal("hide");}});}
if($("#verify_picture_delete").length>0)
{$("#verify_picture_delete").click(function()
{$.ajax({url:domain_url+'ajax_scripts/delete_verify_picture_escort.php',type:'POST',dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#verify_picture_overall img").prop("src","https://m.happyescorts.com/images/placeholder/placeholder_verify_picture.jpg");$("#verify_picture_delete").addClass("hidden");$("#verify_picture_upload").removeClass("hidden");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#upload_verify_video").length>0)
{$("#upload_verify_video").change(function()
{$(this).simpleUpload("/ajax_scripts/upload_verify_video_escort.php",{maxFileSize:134217728,start:function(file)
{$("#progress_video_bar").width(0).removeClass("fw");$("#progress_video_text").html('');},progress:function(progress)
{if(progress>90)progress=90;$("#progress_video_bar").width(progress+"%");if(progress<90)
{$("#progress_video_text").html($("#hidden_verify_escort_message_video_progress").html()+' '+Math.round(progress)+'%');}
else
{$("#progress_video_text").html($("#hidden_verify_escort_message_video_converting").html());}},success:function(data)
{$("#progress_video_bar").width("100%").addClass("fw");$("#progress_video_text").html(data.message);$("#verify_video_overall .video_message").html('');$("#progress_video_overall").addClass("hidden");$("video").append(data.video_source);$("video").removeClass("hidden");$("#verify_video_upload").addClass("hidden");$("#verify_video_delete").removeClass("hidden");Toast.show({id:'verify_video_overall',message:$("#hidden_verify_escort_message_video_success").html(),duration:5000,position:'top',topAdd:50,background:'#04DC0E',color:'#333',opacity:1});},error:function(error)
{$("#progress_video_text").html(error.name+': '+error.message);}});});}
if($("#verify_video_delete").length>0)
{$("#verify_video_delete").click(function()
{$("#verify_video_delete").append('<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" style="vertical-align: middle;"><path fill="#666" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg>');$.ajax({url:domain_url+'ajax_scripts/delete_verify_video_escort.php',type:'POST',dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("video").addClass("hidden");$("video source").remove();$("#progress_video_bar").width(0).removeClass("fw");$("#progress_video_text").html('');$("#progress_video_overall").removeClass("hidden");$("#verify_video_delete").addClass("hidden");$("#verify_video_upload").removeClass("hidden");$("#verify_video_delete svg").remove();}}).fail(function()
{$("#verify_video_delete svg").remove();$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#face_picture_modal").length>0)
{$("#face_picture_modal").imgPicker({url:domain_url+'ajax_scripts/upload_face_picture_escort.php',crop:false,minSize:[100,100],uploadSuccess:function(image)
{$("#face_picture_overall img").prop("src",image.url+"?tm="+(new Date()).getTime());$("#face_picture_upload").addClass("hidden");$("#face_picture_delete").removeClass("hidden");this.modal("hide");},deleteComplete:function()
{this.modal("hide");}});}
if($("#face_picture_delete").length>0)
{$("#face_picture_delete").click(function()
{$.ajax({url:domain_url+'ajax_scripts/delete_face_picture_escort.php',type:'POST',dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#face_picture_overall img").prop("src","https://m.happyescorts.com/images/placeholder/placeholder_picture.jpg");$("#face_picture_delete").addClass("hidden");$("#face_picture_upload").removeClass("hidden");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#id_picture_modal").length>0)
{$("#id_picture_modal").imgPicker({url:domain_url+'ajax_scripts/upload_id_picture_escort.php',crop:false,minSize:[100,100],uploadSuccess:function(image)
{$("#id_picture_overall img").prop("src",image.url+"?tm="+(new Date()).getTime());$("#id_picture_overall img").removeClass("bc_red");$("#id_picture_overall .picture_message").html('');$("#id_picture_upload").addClass("hidden");$("#id_picture_delete").removeClass("hidden");this.modal("hide");},deleteComplete:function()
{this.modal("hide");}});}
if($("#id_picture_delete").length>0)
{$("#id_picture_delete").click(function()
{$.ajax({url:domain_url+'ajax_scripts/delete_id_picture_escort.php',type:'POST',dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#id_picture_overall img").prop("src","https://m.happyescorts.com/images/placeholder/placeholder_picture.jpg");$("#id_picture_delete").addClass("hidden");$("#id_picture_upload").removeClass("hidden");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#verify_submit").length>0)
{$("#verify_submit").click(function()
{var age_verified=parseInt($("#verify_escort_form_overall").data("age-verified"));if(age_verified==0)
{var id_data_complete=true;var vc=$("#verify_country").val();var vt=$("#verify_type").val();var vm=$("#verify_month").val();var vy=$("#verify_year").val();var ved=$("#verify_expiry_date").val();var vfn=$("#verify_first_name").val();if(vc==0)
{$("#verify_country").addClass("bc_red");$("#verify_country").parent().next().html($("#hidden_age_verify_escort_message_country_missing").html());$("html,body").scrollTop($("#verify_country").offset().top-50);id_data_complete=false;}
if(vt==0)
{$("#verify_type").addClass("bc_red");$("#verify_type").parent().next().html($("#hidden_age_verify_escort_message_type_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_type").offset().top-50);id_data_complete=false;}
if(vm==0)
{$("#verify_month").addClass("bc_red");$("#verify_month").parent().next().html($("#hidden_age_verify_escort_message_month_birth_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_month").offset().top-50);id_data_complete=false;}
if(vy==0)
{$("#verify_year").addClass("bc_red");if($("#verify_year").parent().next().html()=="")$("#verify_year").parent().next().html($("#hidden_age_verify_escort_message_year_birth_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_year").offset().top-50);id_data_complete=false;}
if(ved=="")
{$("#verify_expiry_date").addClass("bc_red");$("#verify_expiry_date").parent().next().html($("#hidden_age_verify_escort_message_expiry_date_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_expiry_date").offset().top-50);id_data_complete=false;}
else
{if(ved.match(/(\d{4})-(\d{1,2})-(\d{1,2})/)==null)
{$("#verify_expiry_date").addClass("bc_red");$("#verify_expiry_date").parent().next().html($("#hidden_age_verify_escort_message_expiry_date_wrong").html());if(id_data_complete)$("html,body").scrollTop($("#verify_expiry_date").offset().top-50);id_data_complete=false;}}
if(vfn=="")
{$("#verify_first_name").addClass("bc_red");$("#verify_first_name").parent().next().html($("#hidden_age_verify_escort_message_first_name_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_first_name").offset().top-50);id_data_complete=false;}
if(id_data_complete)
{$.ajax({url:domain_url+'ajax_scripts/save_verify_id_data.php',type:'POST',data:{verify_country:vc,verify_type:vt,verify_month:vm,verify_year:vy,verify_expiry_date:ved,verify_first_name:vfn},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if($("#verify_picture_overall img").attr("src").search(/placeholder/)==-1&&$("#id_picture_overall img").attr("src").search(/placeholder/)==-1)
{$.post(domain_url+'ajax_scripts/set_session_values.php',{verify_show_message:1}).done(function(data)
{if(data=="ok")
{$("#verify_reset_escort").trigger("click");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{if($("#verify_picture_overall img").attr("src").search(/placeholder/)!=-1)
{$("#verify_picture_overall img").addClass("bc_red");$("#verify_picture_overall .picture_message").html($("#hidden_verify_escort_message_upload1").html());$("html,body").scrollTop($("#verify_picture_overall img").offset().top-50);if($("#id_picture_overall img").attr("src").search(/placeholder/)!=-1)
{$("#id_picture_overall img").addClass("bc_red");$("#id_picture_overall .picture_message").html($("#hidden_verify_escort_message_upload3").html());}}
else
{if($("#id_picture_overall img").attr("src").search(/placeholder/)!=-1)
{$("#id_picture_overall img").addClass("bc_red");$("#id_picture_overall .picture_message").html($("#hidden_verify_escort_message_upload3").html());$("html,body").scrollTop($("#id_picture_overall img").offset().top-50);}}}}
if(data.result=="warning")
{if(data.reason=="missing_data")
{$("#verify_reset_escort").trigger("click");}
if(data.reason=="wrong_expiry_date_format")
{$("#verify_expiry_date").addClass("bc_red");$("html,body").scrollTop($("#verify_expiry_date").offset().top-50);}}});}}
else
{if($("#verify_picture_overall img").attr("src").search(/placeholder/)==-1)
{$.post(domain_url+'ajax_scripts/set_session_values.php',{verify_show_message:1}).done(function(data)
{if(data=="ok")
{$("#verify_reset_escort").trigger("click");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$("#verify_picture_overall img").addClass("bc_red");$("#verify_picture_overall .picture_message").html($("#hidden_verify_escort_message_upload1").html());$("html,body").scrollTop($("#verify_picture_overall img").offset().top-50);}}});}
if($("#verify_video_submit").length>0)
{$("#verify_video_submit").click(function()
{var age_verified=parseInt($("#verify_escort_form_overall").data("age-verified"));if(age_verified==0)
{var id_data_complete=true;var vc=$("#verify_country").val();var vt=$("#verify_type").val();var vm=$("#verify_month").val();var vy=$("#verify_year").val();var ved=$("#verify_expiry_date").val();var vfn=$("#verify_first_name").val();if(vc==0)
{$("#verify_country").addClass("bc_red");$("#verify_country").parent().next().html($("#hidden_age_verify_escort_message_country_missing").html());$("html,body").scrollTop($("#verify_country").offset().top-50);id_data_complete=false;}
if(vt==0)
{$("#verify_type").addClass("bc_red");$("#verify_type").parent().next().html($("#hidden_age_verify_escort_message_type_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_type").offset().top-50);id_data_complete=false;}
if(vm==0)
{$("#verify_month").addClass("bc_red");$("#verify_month").parent().next().html($("#hidden_age_verify_escort_message_month_birth_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_month").offset().top-50);id_data_complete=false;}
if(vy==0)
{$("#verify_year").addClass("bc_red");if($("#verify_year").parent().next().html()=="")$("#verify_year").parent().next().html($("#hidden_age_verify_escort_message_year_birth_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_year").offset().top-50);id_data_complete=false;}
if(ved=="")
{$("#verify_expiry_date").addClass("bc_red");$("#verify_expiry_date").parent().next().html($("#hidden_age_verify_escort_message_expiry_date_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_expiry_date").offset().top-50);id_data_complete=false;}
else
{if(ved.match(/(\d{4})-(\d{1,2})-(\d{1,2})/)==null)
{$("#verify_expiry_date").addClass("bc_red");$("#verify_expiry_date").parent().next().html($("#hidden_age_verify_escort_message_expiry_date_wrong").html());if(id_data_complete)$("html,body").scrollTop($("#verify_expiry_date").offset().top-50);id_data_complete=false;}}
if(vfn=="")
{$("#verify_first_name").addClass("bc_red");$("#verify_first_name").parent().next().html($("#hidden_age_verify_escort_message_first_name_missing").html());if(id_data_complete)$("html,body").scrollTop($("#verify_first_name").offset().top-50);id_data_complete=false;}
if(id_data_complete)
{$.ajax({url:domain_url+'ajax_scripts/save_verify_id_data.php',type:'POST',data:{verify_country:vc,verify_type:vt,verify_month:vm,verify_year:vy,verify_expiry_date:ved,verify_first_name:vfn},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if($("#progress_video_bar").hasClass("fw")&&$("#id_picture_overall img").attr("src").search(/placeholder/)==-1)
{$.post(domain_url+'ajax_scripts/set_session_values.php',{verify_show_message:1}).done(function(data)
{if(data=="ok")
{$("#verify_reset_escort").trigger("click");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{if(!$("#progress_video_bar").hasClass("fw"))
{$("#verify_video_overall .video_message").html($("#hidden_verify_escort_message_upload2").html());$("html,body").scrollTop($("#progress_video_overall").offset().top-50);if($("#id_picture_overall img").attr("src").search(/placeholder/)!=-1)
{$("#id_picture_overall img").addClass("bc_red");$("#id_picture_overall .picture_message").html($("#hidden_verify_escort_message_upload3").html());}}
else
{if($("#id_picture_overall img").attr("src").search(/placeholder/)!=-1)
{$("#id_picture_overall img").addClass("bc_red");$("#id_picture_overall .picture_message").html($("#hidden_verify_escort_message_upload3").html());$("html,body").scrollTop($("#id_picture_overall img").offset().top-50);}}}}
if(data.result=="warning")
{if(data.reason=="missing_data")
{$("#verify_reset_escort").trigger("click");}
if(data.reason=="wrong_expiry_date_format")
{$("#verify_expiry_date").addClass("bc_red");$("html,body").scrollTop($("#verify_expiry_date").offset().top-50);}}});}}
else
{if($("#progress_video_bar").hasClass("fw"))
{$.post(domain_url+'ajax_scripts/set_session_values.php',{verify_show_message:1}).done(function(data)
{if(data=="ok")
{$("#verify_reset_escort").trigger("click");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{$("#verify_video_overall .video_message").html($("#hidden_verify_escort_message_upload2").html());$("html,body").scrollTop($("#progress_video_overall").offset().top-50);}}});}
if($("#age_verify_select_escort").length>0)
{$("#age_verify_select_escort").click(function()
{var eid=$("#escort").val();$.post(domain_url+'ajax_scripts/set_session_values.php',{age_verify_escort_id:eid}).done(function(data)
{window.location.reload();}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#age_verify_reset_escort").length>0)
{$("#age_verify_reset_escort").click(function()
{$.post(domain_url+'ajax_scripts/set_session_values.php',{age_verify_escort_id:0}).done(function(data)
{window.location.reload();}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#age_verify_country").length>0)
{$("#age_verify_country").change(function()
{$(this).removeClass("bc_red");$(this).parent().next().html('');});}
if($("#age_verify_type").length>0)
{$("#age_verify_type").change(function()
{$(this).removeClass("bc_red");$(this).parent().next().html('');});}
if($("#age_verify_month").length>0)
{$("#age_verify_month").change(function()
{$(this).removeClass("bc_red");$(this).parent().next().html('');});}
if($("#age_verify_year").length>0)
{$("#age_verify_year").change(function()
{$(this).removeClass("bc_red");$(this).parent().next().html('');});}
if($("#age_verify_expiry_date").length>0)
{if(site_language=='de')
{$.extend(true,$.datePicker.defaults.strings,{months:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],days:['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']});}
var input=$("#age_verify_expiry_date");input.attr("autocomplete","off");$("#age_verify_expiry_date").click(function()
{var ed=input.val();var widget=$.datePicker.api.show({element:input,views:{month:{show:ed,selected:[ed],firstDayOfWeek:1}},callbacks:{onHide:function(calendar)
{if($("#age_verify_expiry_date").val()!="")
{$("#age_verify_expiry_date").removeClass("bc_red");$("#age_verify_expiry_date").parent().next().html('');}}}});input.data("widget",widget);});}
if($("#age_verify_first_name").length>0)
{$("#age_verify_first_name").blur(function()
{if($("#age_verify_first_name").val()!="")
{$(this).removeClass("bc_red");$(this).parent().next().html('');}});}
if($("div[id^=age_verify_picture_modal]").length>0)
{$("div[id^=age_verify_picture_modal]").each(function()
{var nr=$(this).attr("id").replace(/age_verify_picture_modal/,"");$(this).imgPicker({url:domain_url+'ajax_scripts/upload_age_verify_picture_escort.php',crop:false,minSize:[100,100],data:{number:nr},uploadSuccess:function(image)
{$("#age_verify_picture_overall"+nr+" img").prop("src",image.url+"?tm="+(new Date()).getTime());$("#age_verify_picture_overall"+nr+" img").removeClass("bc_red");$("#age_verify_picture_overall"+nr+" .age_verify_picture_message").html('');$("#age_verify_picture_upload"+nr).addClass("hidden");if($(".age_verify_picture_overall img:not([src*=placeholder])").length<2)
{$("#age_verify_picture_delete"+nr).removeClass("hidden");}
else
{$(".age_verify_picture_delete").addClass("hidden");}
this.modal("hide");},deleteComplete:function()
{this.modal("hide");}});});}
if($("div[id^=age_verify_picture_delete]").length>0)
{$("div[id^=age_verify_picture_delete]").each(function()
{$(this).click(function()
{var nr=$(this).attr("id").replace(/age_verify_picture_delete/,"");$.ajax({url:domain_url+'ajax_scripts/delete_age_verify_picture_escort.php',type:'POST',data:{number:nr},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#age_verify_picture_overall"+nr+" img").prop("src","https://m.happyescorts.com/images/placeholder/placeholder_picture.jpg");$("#age_verify_picture_delete"+nr+"").addClass("hidden");$("#age_verify_picture_upload"+nr+"").removeClass("hidden");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});});}
if($("#age_verify_submit").length>0)
{$("#age_verify_submit").click(function()
{var id_data_complete=true;var avc=$("#age_verify_country").val();var avt=$("#age_verify_type").val();var avm=$("#age_verify_month").val();var avy=$("#age_verify_year").val();var aved=$("#age_verify_expiry_date").val();var avfn=$("#age_verify_first_name").val();if(avc==0)
{$("#age_verify_country").addClass("bc_red");$("#age_verify_country").parent().next().html($("#hidden_age_verify_escort_message_country_missing").html());$("html,body").scrollTop($("#age_verify_country").offset().top-50);id_data_complete=false;}
if(avt==0)
{$("#age_verify_type").addClass("bc_red");$("#age_verify_type").parent().next().html($("#hidden_age_verify_escort_message_type_missing").html());if(id_data_complete)$("html,body").scrollTop($("#age_verify_type").offset().top-50);id_data_complete=false;}
if(avm==0)
{$("#age_verify_month").addClass("bc_red");$("#age_verify_month").parent().next().html($("#hidden_age_verify_escort_message_month_birth_missing").html());if(id_data_complete)$("html,body").scrollTop($("#age_verify_month").offset().top-50);id_data_complete=false;}
if(avy==0)
{$("#age_verify_year").addClass("bc_red");if($("#age_verify_year").parent().next().html()=="")$("#age_verify_year").parent().next().html($("#hidden_age_verify_escort_message_year_birth_missing").html());if(id_data_complete)$("html,body").scrollTop($("#age_verify_year").offset().top-50);id_data_complete=false;}
if(aved=="")
{$("#age_verify_expiry_date").addClass("bc_red");$("#age_verify_expiry_date").parent().next().html($("#hidden_age_verify_escort_message_expiry_date_missing").html());if(id_data_complete)$("html,body").scrollTop($("#age_verify_expiry_date").offset().top-50);id_data_complete=false;}
else
{if(aved.match(/(\d{4})-(\d{1,2})-(\d{1,2})/)==null)
{$("#age_verify_expiry_date").addClass("bc_red");$("#age_verify_expiry_date").parent().next().html($("#hidden_age_verify_escort_message_expiry_date_wrong").html());if(id_data_complete)$("html,body").scrollTop($("#age_verify_expiry_date").offset().top-50);id_data_complete=false;}}
if(avfn=="")
{$("#age_verify_first_name").addClass("bc_red");$("#age_verify_first_name").parent().next().html($("#hidden_age_verify_escort_message_first_name_missing").html());if(id_data_complete)$("html,body").scrollTop($("#age_verify_first_name").offset().top-50);id_data_complete=false;}
if(id_data_complete)
{$.ajax({url:domain_url+'ajax_scripts/save_age_verify_id_data.php',type:'POST',data:{age_verify_country:avc,age_verify_type:avt,age_verify_month:avm,age_verify_year:avy,age_verify_expiry_date:aved,age_verify_first_name:avfn},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if($("#age_verify_picture_overall1 img").attr("src").search(/placeholder/)==-1&&$("#age_verify_picture_overall2 img").attr("src").search(/placeholder/)==-1)
{$.post(domain_url+'ajax_scripts/set_session_values.php',{age_verify_show_message:1}).done(function(data)
{if(data=="ok")
{$("#age_verify_reset_escort").trigger("click");}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});}
else
{if($("#age_verify_picture_overall1 img").attr("src").search(/placeholder/)!=-1)
{$("#age_verify_picture_overall1 img").addClass("bc_red");$("#age_verify_picture_overall1 .age_verify_picture_message").html($("#hidden_age_verify_escort_message_upload1").html());$("html,body").scrollTop($("#age_verify_picture_overall1 img").offset().top-50);if($("#age_verify_picture_overall2 img").attr("src").search(/placeholder/)!=-1)
{$("#age_verify_picture_overall2 img").addClass("bc_red");$("#age_verify_picture_overall2 .age_verify_picture_message").html($("#hidden_age_verify_escort_message_upload2").html());}}
else
{if($("#age_verify_picture_overall2 img").attr("src").search(/placeholder/)!=-1)
{$("#age_verify_picture_overall2 img").addClass("bc_red");$("#age_verify_picture_overall2 .age_verify_picture_message").html($("#hidden_age_verify_escort_message_upload2").html());$("html,body").scrollTop($("#age_verify_picture_overall2 img").offset().top-50);}}}}
if(data.result=="warning")
{if(data.reason=="missing_data")
{$("#age_verify_reset_escort").trigger("click");}
if(data.reason=="wrong_expiry_date_format")
{$("#age_verify_expiry_date").addClass("bc_red");$("html,body").scrollTop($("#age_verify_expiry_date").offset().top-50);}}});}});}
if($("#sms_notification_finish_subscription").length>0)
{$("#sms_notification_finish_subscription").change(function()
{var code=$(this).parent().parent().data("code");var value="0";if($(this).is(":checked"))value="1";$.ajax({url:domain_url+'ajax_scripts/set_status_sms_notification.php',type:'POST',data:{type:'finish_subscription',code:code,value:value},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{}
if(data.result=="error")
{}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#prefer_local_clients").length>0)
{$("#prefer_local_clients").change(function()
{var type="";if($("img[src*=escort_of_the_week]").length>0)type="escort";if($("img[src*=agency_of_the_week]").length>0)type="agency";var code=$(this).parent().parent().data("code");var value="0";if($(this).is(":checked"))value="1";$.ajax({url:domain_url+'ajax_scripts/set_status_prefer_local_clients.php',type:'POST',data:{type:type,code:code,value:value},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{}
if(data.result=="error")
{}}).fail(function()
{$.fancybox.open('<div class="toast_message warning"><span class="h2">Warning</span><p>Connection error!</p></div>');});});}
if($("#slider_escort").length>0&&$("#fancybox_gallery").length>0)
{$("#slider_escort .slick-slide img").click(function()
{var img_src=$(this).attr("src");var pos_point=img_src.lastIndexOf(".");var big_img_src=img_src.substr(0,pos_point)+"_big"+img_src.substr(pos_point);var big_pictures=[];var start_picture_index=-1;$("#fancybox_gallery span").each(function(index)
{big_pictures.push($(this).text());if($(this).text()==big_img_src)start_picture_index=index;});if(start_picture_index>-1)
{var fancybox_pictures=[];big_pictures.forEach(function(item,index)
{var insert_object={src:item,opts:{thumb:item.replace("_big","")}};fancybox_pictures.push(insert_object);});$.fancybox.open(fancybox_pictures,{loop:true,onInit:function(instance)
{instance.jumpTo(start_picture_index);}});}});}
if($("div.swiper-container").length>0&&$("#fancybox_gallery").length>0)
{$("div.swiper-container .swiper-slide img").click(function()
{var img_src=$(this).attr("src");var pos_point=img_src.lastIndexOf(".");var big_img_src=img_src.substr(0,pos_point)+"_big"+img_src.substr(pos_point);var big_pictures=[];var start_picture_index=-1;$("#fancybox_gallery span").each(function(index)
{big_pictures.push($(this).text());if($(this).text()==big_img_src)start_picture_index=index;});if(start_picture_index>-1)
{var fancybox_pictures=[];big_pictures.forEach(function(item,index)
{var insert_object={src:item,opts:{thumb:item.replace("_big","")}};fancybox_pictures.push(insert_object);});$.fancybox.open(fancybox_pictures,{loop:true,onInit:function(instance)
{instance.jumpTo(start_picture_index);}});}});}
if($("#private_messenger_code_overall").length>0)
{if($("#avatar_modal").length>0)
{var avatar_code=$("#private_messenger_code_overall").attr("data-code");var avatar_user_id=$("#private_messenger_code_overall").attr("data-user-id");$("#avatar_modal").imgPicker({url:domain_url+'ajax_scripts/upload_member_avatar.php',aspectRatio:0.67,minSize:[210,315],setSelect:[0,0,210,315],data:{code:avatar_code,user_id:avatar_user_id},uploadSuccess:function(image)
{var select=new Array(0,0,0,0);if((image.width/image.height)>=0.67)
{var crop_width=image.height*0.67;var crop_height=image.height;select[0]=Math.round((image.width-crop_width)/2);select[2]=Math.round(((image.width-crop_width)/2)+crop_width);select[3]=crop_height;}
else
{var crop_width=image.width;var crop_height=image.width/0.67;select[1]=Math.round((image.height-crop_height)/2);select[2]=crop_width;select[3]=Math.round(((image.height-crop_height)/2)+crop_height);}
this.options.setSelect=select;},cropSuccess:function(image)
{this.modal("hide");window.location.reload();},deleteComplete:function()
{this.modal("hide");}});}
else
{if($(".private_messenger_member_registered_picture_name_overall").length>0)
{$(".private_messenger_member_registered_picture_name_overall").click(function()
{var modal_title="";var modal_text=$(".private_messenger_member_registered_picture div").css("background-image");modal_text=modal_text.slice(5);modal_text=modal_text.slice(0,-2);modal_text=modal_text.replace("_small","");modal_text='<img src="'+modal_text+'" width="252" height="376" style="width: 252px;" /><br/><div class="choice_buttons_overall"><span id="choice_button_delete" class="choice_button">'+$("#hidden_verify_escort_button_picture_delete").html()+'</span></div>';$("body").qtip({content:{title:modal_title,text:modal_text},position:{my:'center',at:'center',target:$(window)},style:{classes:'qtip-bootstrap'},show:{event:false,modal:{on:true,blur:true,escape:false},ready:true},hide:{event:'unfocus'},events:{show:function(event,api)
{$(api.elements.tooltip).on("click","#choice_button_delete",function()
{$.ajax({url:domain_url+'ajax_scripts/delete_member_avatar.php',type:'POST',data:{code:$("#private_messenger_code_overall").attr("data-code"),user_id:$("#private_messenger_code_overall").attr("data-user-id")},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{window.location.reload();}}).fail(function()
{});});}}});});}}
$(".private_messenger_histories_overall").on("click","#search_button",function()
{var co=$("#private_messenger_code_overall").attr("data-code");if($("#search_text").css("visibility")=="hidden")
{}
else
{var search_text=$("#search_text").val();if(search_text!="")
{if(search_text.length>=3)
{$(".private_messenger_history_entry_overall").removeClass("active");$(".private_messenger_messages_overall").html('');$.ajax({url:domain_url+'ajax_scripts/search_private_messenger_code.php',type:'POST',data:{code:co,search_text:search_text},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".private_messenger_histories_histories_overall").html(data.histories);}}).fail(function()
{Toast.show({id:'search_button',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});}
else
{Toast.show({id:'search_button',message:$("#hidden_private_messenger_toast_message_minimum_three_chars").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});}}
else
{$.ajax({url:domain_url+'ajax_scripts/update_private_messenger_code.php',type:'POST',data:{code:co,message_history_id:0,search_text:$("#search_text").val()},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.histories!="")
{$(".private_messenger_histories_histories_overall").html(data.histories);$(".private_messenger_messages_overall").html('');}}});}}});$(".private_messenger_histories_overall").on("keyup","#search_text",function(event)
{var search_text=$(this).val();});$(".private_messenger_histories_overall").on("keydown","#search_text",function(event)
{if(event.keyCode==13)$("#search_button").trigger("click");});$(".private_messenger_histories_overall").on("focus","#search_text",function(event)
{$(this).addClass("has_focus");});$(".private_messenger_histories_overall").on("blur","#search_text",function(event)
{$(this).removeClass("has_focus");});$(".private_messenger_histories_overall").on("click","#clear_button",function()
{var co=$("#private_messenger_code_overall").attr("data-code");var search_text=$("#search_text").val();if(search_text!="")
{$("#search_text").val("");}
$(".private_messenger_history_entry_overall").removeClass("active");$("#private_messenger_code_overall").attr("data-updating","updating");$.ajax({url:domain_url+'ajax_scripts/update_private_messenger_code.php',type:'POST',data:{code:co,message_history_id:0,search_text:$("#search_text").val()},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.histories!="")
{$(".private_messenger_histories_histories_overall").html(data.histories);$(".private_messenger_messages_overall").html('');}}
$("#private_messenger_code_overall").attr("data-updating","");}).fail(function()
{Toast.show({id:'private_messenger_code_overall',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});$("#private_messenger_code_overall").attr("data-updating","");});});$(".private_messenger_histories_overall").on("click","#email_notifications",function()
{});$(".private_messenger_histories_overall").on("click","#favourites",function()
{if(!$(this).hasClass("active"))
{$(".private_messenger_histories_favourites_overall").css("display","block");$(this).addClass("active");}
else
{$(".private_messenger_histories_favourites_overall").css("display","none");$(this).removeClass("active");}});var try_interval;function wait_for_updating(mhid)
{if($("#private_messenger_code_overall").attr("data-updating")!="updating")
{$(".private_messenger_history_entry_overall[data-mhid="+mhid+"]").trigger("click");clearInterval(try_interval);}
else
{}}
$(".private_messenger_histories_overall").on("click",".private_messenger_history_entry_overall",function()
{var co=$("#private_messenger_code_overall").attr("data-code");var updating=$("#private_messenger_code_overall").attr("data-updating");var fs=parseInt($("#private_messenger_code_overall").attr("data-fullscreen"));var mhid=parseInt($(this).attr("data-mhid"));if(updating!="updating")
{if(mhid>0)
{$("#private_messenger_code_overall").attr("data-updating","updating");$.ajax({url:domain_url+'ajax_scripts/update_private_messenger_code.php',type:'POST',data:{code:co,message_history_id:mhid,search_text:$("#search_text").val(),first:1,fullscreen:fs,language:site_language},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.histories!="")$(".private_messenger_histories_histories_overall").html(data.histories);if(data.messages_middle!="")
{$(".private_messenger_messages_overall").html(data.messages_top+data.messages_middle_start+data.messages_middle+data.messages_middle_end+data.messages_bottom+data.messages_disabled);if(data.member_info!="")
{$(".private_messenger_messages_top_text .name").qtip({content:{text:data.member_info},position:{my:'top center',at:'bottom center'},style:{width:200,classes:'qtip-bootstrap'}});$(".private_messenger_messages_top_text .info").qtip({content:{text:data.member_info},position:{my:'top center',at:'bottom center'},style:{width:200,classes:'qtip-bootstrap'}});}
if(data.member_online!="")
{$("#member_online").html(data.member_online);}
else
{$("#member_online").html('');}
$(".private_message_content img.small").each(function()
{$(this).on("load",function()
{var width_original=$(this).get(0).naturalWidth;var height_original=$(this).get(0).naturalHeight;var width=$(this).width();if(width_original>width)
{var height=Math.ceil((width*height_original)/width_original);$(this).attr("height",height);$(this).next().css("height",height+"px");}});});if($(window).width()<=1030)
{$(".private_messenger_histories_overall").addClass("hidden");$(".private_messenger_messages_overall").css("display","block");}
if($("#search_text").val()=="")
{$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").prop("scrollHeight"));}
else
{if($(".private_messenger_messages_middle_overall span.marked").length>0)
{var scroll_pos=$(".private_messenger_messages_middle_overall span.marked").first().parent().parent().position();$(".private_messenger_messages_middle_overall").scrollTop(scroll_pos.top-50);}
else
{$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").prop("scrollHeight"));}}
if(data.picture_modals!="")
{$("div[id^=pictureModal]").remove();$("#private_messenger_code_overall").after(data.picture_modals);}
if(data.messenger_disabled)$(".private_messenger_messages_disabled5_overall").removeClass("hidden");}}
if(data.result=="error")
{Toast.show({id:'private_messenger_code_overall',message:$("#hidden_private_messenger_toast_message_error_occurred").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});}
$("#private_messenger_code_overall").attr("data-updating","");}).fail(function()
{Toast.show({id:'private_messenger_code_overall',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});$("#private_messenger_code_overall").attr("data-updating","");});}}
else
{try_interval=setInterval(wait_for_updating,100,mhid);}});$(".private_messenger_histories_overall").on("click",".private_messenger_history_entry_delete .fa-trash",function()
{var co=$("#private_messenger_code_overall").attr("data-code");var mhid=parseInt($(this).parent().parent().attr("data-mhid"));var modal_title="";if($(this).hasClass("member_registered")||$(this).hasClass("member_unregistered"))modal_title=$("#hidden_private_messenger_modal_finish_conversation_title").html();else modal_title=$("#hidden_private_messenger_modal_finish_conversation_block_title").html();var modal_text="";if($(this).hasClass("member_registered")||$(this).hasClass("member_unregistered"))modal_text=$("#hidden_private_messenger_modal_finish_conversation_text").html();else modal_text=$("#hidden_private_messenger_modal_finish_conversation_block_text").html();$("body").qtip({content:{title:modal_title,text:modal_text,button:true},position:{my:'center',at:'center',target:$(window)},style:{classes:'qtip-bootstrap'},show:{event:false,modal:{on:true,blur:false,escape:false},ready:true},hide:{event:'unfocus'},events:{show:function(event,api)
{$(api.elements.tooltip).on("click","#choice_button_yes",function()
{$(api.elements.tooltip).find(".qtip-close").trigger("click");$.ajax({url:domain_url+'ajax_scripts/mark_messenger_messages_as_deleted_code.php',type:'POST',data:{code:co,message_history_id:mhid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".private_messenger_messages_overall").html('');$("#messenger_history"+mhid).remove();}
if(data.result=="error")
{Toast.show({id:'messenger_history'+mhid,message:$("#hidden_private_messenger_toast_message_error_occurred").html(),duration:5000,position:'top',topAdd:5,background:'#FF6D4D',color:'#333',opacity:1});}}).fail(function()
{Toast.show({id:'messenger_history'+mhid,message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});});$(api.elements.tooltip).on("click","#choice_button_no",function()
{$(api.elements.tooltip).find(".qtip-close").trigger("click");});$(api.elements.tooltip).on("click","#choice_button_block",function()
{$(api.elements.tooltip).find(".qtip-close").trigger("click");$.ajax({url:domain_url+'ajax_scripts/block_user_for_messenger.php',type:'POST',data:{code:co,message_history_id:mhid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".private_messenger_messages_overall").html('');if(data.message_histories_to_remove.length>0)
{for(var i=0;i<data.message_histories_to_remove.length;i++)
{$("#messenger_history"+data.message_histories_to_remove[i]).remove();}}}
if(data.result=="error")
{Toast.show({id:'messenger_history'+mhid,message:$("#hidden_private_messenger_toast_message_error_occurred").html(),duration:5000,position:'top',topAdd:5,background:'#FF6D4D',color:'#333',opacity:1});}}).fail(function()
{Toast.show({id:'messenger_history'+mhid,message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});});}}});return false;});$(".private_messenger_histories_overall").on("click",".private_messenger_favourite_entry_overall",function()
{var co=$("#private_messenger_code_overall").attr("data-code");var eid=parseInt($(this).attr("data-eid"));if(eid>0)
{$.ajax({url:domain_url+'ajax_scripts/prepare_message_history_code.php',type:'POST',data:{code:co,escort_id:eid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.message_history_exists)
{if(data.message_history_id>0)
{$("#favourites").trigger("click");$("#messenger_history"+data.message_history_id).trigger("click");}}
else
{if(data.message_history_id>0)
{$("#favourites").trigger("click");}}}});}});$(".private_messenger_messages_overall").on("click","#button_back",function()
{if($(window).width()<=1030)
{var mhid=parseInt($(".private_messenger_histories_histories_overall .private_messenger_history_entry_overall.active").attr("data-mhid"));$("#messenger_history"+mhid).removeClass("active");$(".private_messenger_messages_overall").css("display","none").html('');$(".private_messenger_histories_overall").removeClass("hidden");}});$(".private_messenger_messages_overall").on("click","#max_min_messenger",function()
{if($(this).hasClass("fa-window-maximize"))
{$("html").addClass("maximized");$("body").addClass("maximized");$("header").addClass("hidden");$(".main_nav").addClass("hidden");$("main").addClass("maximized");$(".div_navigation2").addClass("hidden");$(".breadcrumbs_overall").addClass("hidden");$(".div_content").addClass("maximized");$(".block_overall").addClass("maximized");$(".div_content h1").addClass("hidden");$(".div_content hr").addClass("hidden");$(".block_content").addClass("maximized");$(".note").addClass("hidden");$("#private_messenger_code_overall").addClass("maximized");$(".private_messenger_histories_overall").addClass("maximized");$(".private_messenger_histories_histories_overall").addClass("maximized");$(".private_messenger_messages_overall").addClass("maximized");$(".private_messenger_messages_middle_overall").addClass("maximized");$(".legend_overall").addClass("hidden");$(".div_advertising_blocks").addClass("hidden");$("footer").addClass("hidden");$(this).removeClass("fa-window-maximize").addClass("fa-window-minimize");$("html,body").scrollTop(0);$("html,body").height($(window).outerHeight());$("html,body").css("max-height",$(window).outerHeight()+"px");$("#private_messenger_code_overall").attr("data-fullscreen","1");}
else
{$("html").removeClass("maximized");$("body").removeClass("maximized");$("header").removeClass("hidden");$(".main_nav").removeClass("hidden");$(".div_navigation2").removeClass("hidden");$(".breadcrumbs_overall").removeClass("hidden");$(".div_content").removeClass("maximized");$(".block_overall").removeClass("maximized");$(".div_content h1").removeClass("hidden");$(".div_content hr").removeClass("hidden");$(".block_content").removeClass("maximized");$(".note").removeClass("hidden");$("#private_messenger_code_overall").removeClass("maximized");$(".private_messenger_histories_overall").removeClass("maximized");$(".private_messenger_histories_histories_overall").removeClass("maximized");$(".private_messenger_messages_overall").removeClass("maximized");$(".private_messenger_messages_middle_overall").removeClass("maximized");$(".legend_overall").removeClass("hidden");$(".div_advertising_blocks").removeClass("hidden");$("footer").removeClass("hidden");$(this).removeClass("fa-window-minimize").addClass("fa-window-maximize");$("html,body").removeAttr("style");$("#private_messenger_code_overall").attr("data-fullscreen","0");}});$(".private_messenger_messages_overall").on("click",".delete_message",function()
{var parent=$(this).parent().parent().parent().parent();var co=$("#private_messenger_code_overall").attr("data-code");var fsns=$("#private_messenger_code_overall").attr("data-fsns");var mhid=parseInt($(".private_messenger_histories_histories_overall .private_messenger_history_entry_overall.active").attr("data-mhid"));var mid=parseInt($(this).attr("data-message"));if(mid>0)
{if($(".private_message_overall .private_message_right").length==1)
{var modal_title="";if($(this).hasClass("member_registered"))modal_title=$("#hidden_private_messenger_modal_finish_conversation_title").html();else modal_title=$("#hidden_private_messenger_modal_finish_conversation_block_title").html();var modal_text="";if($(this).hasClass("member_registered"))modal_text=$("#hidden_private_messenger_modal_finish_conversation_text").html();else modal_text=$("#hidden_private_messenger_modal_finish_conversation_block_text").html();$("body").qtip({content:{title:modal_title,text:modal_text,button:true},position:{my:'center',at:'center',target:$(window)},style:{classes:'qtip-bootstrap'},show:{event:false,modal:{on:true,blur:false,escape:false},ready:true},hide:{event:'unfocus'},events:{show:function(event,api)
{$(api.elements.tooltip).on("click","#choice_button_yes",function()
{$(api.elements.tooltip).find(".qtip-close").trigger("click");$.ajax({url:domain_url+'ajax_scripts/mark_messenger_message_as_deleted_code.php',type:'POST',data:{code:co,message_history_id:mhid,message_id:mid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(parent).remove();}}).fail(function()
{Toast.show({id:'location',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});});$(api.elements.tooltip).on("click","#choice_button_no",function()
{$(api.elements.tooltip).find(".qtip-close").trigger("click");});$(api.elements.tooltip).on("click","#choice_button_block",function()
{$(api.elements.tooltip).find(".qtip-close").trigger("click");$.ajax({url:domain_url+'ajax_scripts/block_user_for_messenger.php',type:'POST',data:{code:co,message_history_id:mhid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".private_messenger_messages_overall").html('');if(data.message_histories_to_remove.length>0)
{for(var i=0;i<data.message_histories_to_remove.length;i++)
{$("#messenger_history"+data.message_histories_to_remove[i]).remove();}}}
if(data.result=="error")
{Toast.show({id:'messenger_history'+mhid,message:$("#hidden_private_messenger_toast_message_error_occurred").html(),duration:5000,position:'top',topAdd:5,background:'#FF6D4D',color:'#333',opacity:1});}}).fail(function()
{Toast.show({id:'messenger_history'+mhid,message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});});}}});}
else
{$.ajax({url:domain_url+'ajax_scripts/mark_messenger_message_as_deleted_code.php',type:'POST',data:{code:co,message_history_id:mhid,message_id:mid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(parent).remove();}}).fail(function()
{Toast.show({id:'location',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});}}});function share_location(position)
{var co=$("#private_messenger_code_overall").attr("data-code");var fsns=$("#private_messenger_code_overall").attr("data-fsns");var mhid=parseInt($(".private_messenger_histories_histories_overall .private_messenger_history_entry_overall.active").attr("data-mhid"));if(mhid>0&&position.coords.latitude!=""&&position.coords.longitude!="")
{if(fsns!="yes")
{$.ajax({url:domain_url+'ajax_scripts/share_location.php',type:'POST',data:{code:co,message_history_id:mhid,latitude:position.coords.latitude,longitude:position.coords.longitude},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{updatePrivateMessengerCode(true);$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").prop("scrollHeight"));}}).fail(function()
{Toast.show({id:'location',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});}}}
function location_error(error)
{switch(error.code)
{case error.PERMISSION_DENIED:break;case error.POSITION_UNAVAILABLE:break;case error.TIMEOUT:break;case error.UNKNOWN_ERROR:break;}}
$(".private_messenger_messages_overall").on("click","#location",function(event)
{if(navigator.geolocation)
{navigator.geolocation.getCurrentPosition(share_location,location_error);}});$(".private_messenger_messages_overall").on("keyup","#message_text",function(event)
{var max_height=100;var me=$(this).val();me=myTrimLineBreaks(me);$(this).val(me);if(me!="")
{$("#voice_message").parent().addClass("hidden");$("#button_message_send").parent().removeClass("hidden");}
else
{$("#button_message_send").parent().addClass("hidden");$("#voice_message").parent().removeClass("hidden");}
var calc_height=$(".private_messenger_messages_overall").height()-52;var height=$(this).height();var scroll_height=$(this).prop("scrollHeight");if(scroll_height>height)
{if(scroll_height<50)
{$(this).height(scroll_height).css("margin-top",Math.ceil((50-scroll_height)/2)+"px");}
else
{if(scroll_height<max_height)
{$(".private_messenger_messages_middle_overall").height(calc_height-scroll_height);$(".private_messenger_messages_bottom_overall").height(scroll_height);$(".private_messenger_messages_bottom_message_text").height(scroll_height);$(this).height(scroll_height).css("margin-top","0");}}}
else
{if(scroll_height<50)
{$(this).attr("style","");var height=$(this).height();var scroll_height=$(this).prop("scrollHeight");$(this).height(scroll_height).css("margin-top",Math.ceil((50-scroll_height)/2)+"px");}
else
{$(this).attr("style","");var height=$(this).height();var scroll_height=$(this).prop("scrollHeight");$(this).height(scroll_height);if(scroll_height>50)
{$(this).css("margin-top","0");$(".private_messenger_messages_bottom_message_text").height(scroll_height);$(".private_messenger_messages_bottom_overall").height(scroll_height);$(".private_messenger_messages_middle_overall").height(calc_height-scroll_height);}
else
{$(this).css("margin-top",Math.ceil((50-scroll_height)/2)+"px");$(".private_messenger_messages_bottom_message_text").attr("style","");$(".private_messenger_messages_bottom_overall").attr("style","");$(".private_messenger_messages_middle_overall").attr("style","");}}}});$(".private_messenger_messages_overall").on("keydown","#message_text",function(event)
{if(event.keyCode==13)$("#button_message_send").trigger("click");});$(".private_messenger_messages_overall").on("click","#button_message_send",function()
{var co=$("#private_messenger_code_overall").attr("data-code");var fsns=$("#private_messenger_code_overall").attr("data-fsns");var mhid=parseInt($(".private_messenger_histories_histories_overall .private_messenger_history_entry_overall.active").attr("data-mhid"));var me=$("#message_text").val();me=myTrim(me);$("#message_text").val(me);if(mhid>0&&me!="")
{if(fsns!="yes")
{if($("#button_message_send").data("status")!="sending")
{$("#button_message_send").data("status","sending");$.ajax({url:domain_url+'ajax_scripts/save_private_message_code.php',type:'POST',data:{code:co,message_history_id:mhid,message:me},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#message_text").val("");$("#message_text").attr("style","");$(".private_messenger_messages_bottom_message_text").attr("style","");$(".private_messenger_messages_bottom_overall").attr("style","");$(".private_messenger_messages_middle_overall").attr("style","");$("#button_message_send").parent().addClass("hidden");$("#voice_message").parent().removeClass("hidden");me=me.replace(/(:([a-z_-]+):)/g,' <i class="em em-$2"></i>');updatePrivateMessengerCode(true);$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").prop("scrollHeight"));}
if(data.result=="fake_suspicion")
{$("#message_text").val("");$("#message_text").attr("style","");$(".private_messenger_messages_bottom_message_text").attr("style","");$(".private_messenger_messages_bottom_overall").attr("style","");$(".private_messenger_messages_middle_overall").attr("style","");$("#button_message_send").parent().addClass("hidden");$("#voice_message").parent().removeClass("hidden");var output_message='';if($(".private_messenger_messages_middle_overall div[data-today=1]").length==0)output_message+='<div data-today="1" class="day_partition_overall"><span class="day_partition">'+$("#hidden_private_messenger_day_partition_today").html()+'</span></div>';output_message+='<div class="private_message_overall notranslate"><div class="private_message_right"><span class="private_message_content">'+me;output_message+='<br/><span class="private_message_time">'+data.time+'</span></span></div></div>';$(".private_messenger_messages_middle_overall").append(output_message);$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").prop("scrollHeight"));clearInterval(pm_interval);$("#private_messenger_code_overall").attr("data-fsns","yes");$.ajax({url:domain_url+'ajax_scripts/mark_messenger_message_with_admin_hint_bad_word_link.php',type:'POST',data:{code:co,message_history_id:mhid,message_id:data.mid},dataType:'json'}).done(function(data)
{});}
if(data.result=="error")
{Toast.show({id:'button_message_send',message:$("#hidden_private_messenger_toast_message_error_occurred").html(),duration:5000,position:'top',topAdd:5,background:'#FF6D4D',color:'#333',opacity:1});}
$("#button_message_send").data("status","");}).fail(function()
{Toast.show({id:'button_message_send',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});$("#button_message_send").data("status","");});}}
else
{$("#message_text").val("");$("#message_text").attr("style","");$(".private_messenger_messages_bottom_message_text").attr("style","");$(".private_messenger_messages_bottom_overall").attr("style","");$(".private_messenger_messages_middle_overall").attr("style","");me=me.replace(/(:([a-z_-]+):)/g,' <i class="em em-$2"></i>');var current_time=new Date();var time=current_time.getHours()+':'+current_time.getMinutes()+' ';if(current_time.getDate()<10)time+='0';time+=current_time.getDate()+'.';if((current_time.getMonth()+1)<10)time+='0';time+=(current_time.getMonth()+1)+'.';var output_message='';if($(".private_messenger_messages_middle_overall div[data-today=1]").length==0)output_message+='<div data-today="1" class="day_partition_overall"><span class="day_partition">'+$("#hidden_private_messenger_day_partition_today").html()+'</span></div>';output_message+='<div class="private_message_overall notranslate"><div class="private_message_right"><span class="private_message_content">'+me;output_message+='<br/><span class="private_message_time">'+time+'</span></span></div></div>';$(".private_messenger_messages_middle_overall").append(output_message);$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").prop("scrollHeight"));}}});$(".private_messenger_messages_overall").on("click","#execute_update",function()
{updatePrivateMessengerCode(true);});$(".private_messenger_messages_overall").on("click","#menu",function()
{$(".private_messenger_messages_disabled3_overall").removeClass("hidden");});$(".private_messenger_messages_overall").on("click","#menu_emojis",function()
{$(".private_messenger_messages_disabled3_overall").addClass("hidden");$("#emojis").trigger("click");});$(".private_messenger_messages_overall").on("click","#menu_attachments",function()
{$(".private_messenger_messages_disabled3_overall").addClass("hidden");$("#attachments").trigger("click");});$(".private_messenger_messages_overall").on("click","#menu_location",function()
{$(".private_messenger_messages_disabled3_overall").addClass("hidden");$("#location").trigger("click");});$(".private_messenger_messages_overall").on("click","#menu_voice_message",function()
{$(".private_messenger_messages_disabled3_overall").addClass("hidden");$("#voice_message").trigger("click");});$(".private_messenger_messages_overall").on("click","#menu_cancel",function()
{$(".private_messenger_messages_disabled3_overall").addClass("hidden");});$(".private_messenger_messages_overall").on("click",".private_messenger_messages_disabled3_overall",function()
{$(".private_messenger_messages_disabled3_overall").addClass("hidden");});$(".private_messenger_messages_overall").on("click",".private_messenger_messages_disabled4_overall",function()
{$(".private_messenger_messages_disabled4_overall").addClass("hidden");});function updatePrivateMessengerCode(scroll)
{var co=$("#private_messenger_code_overall").attr("data-code");var updating=$("#private_messenger_code_overall").attr("data-updating");var fs=parseInt($("#private_messenger_code_overall").attr("data-fullscreen"));if(updating!="updating")
{var mhid=parseInt($(".private_messenger_histories_histories_overall .private_messenger_history_entry_overall.active").attr("data-mhid"));if(mhid>0)
{if(!$("#search_text").hasClass("has_focus"))
{$("#private_messenger_code_overall").attr("data-updating","updating");var lmid=$(".private_messenger_messages_middle_overall .private_message_overall").last().attr("data-mid");var lmw=$(".private_messenger_messages_middle_overall .private_message_overall").last().attr("data-written");$.ajax({url:domain_url+'ajax_scripts/update_private_messenger_code.php',type:'POST',data:{code:co,message_history_id:mhid,last_message_id:lmid,search_text:$("#search_text").val(),fullscreen:fs},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.histories!="")$(".private_messenger_histories_histories_overall").html(data.histories);if(data.messages_top_replace!="")
{$(".private_messenger_messages_top_overall").html(data.messages_top_replace);}
if(data.member_online!="")
{$("#member_online").html(data.member_online);}
else
{$("#member_online").html('');}
if(data.messages_middle!="")
{$("#hint_new_messages").remove();if($(".private_message_overall_info").length>0)
{if($(".private_message_overall_admin").length==0)$(".private_messenger_messages_middle_overall .private_message_overall").last().after(data.messages_middle);}
else
{if($(".private_message_overall_admin").length==0)$(".private_messenger_messages_middle_overall").append(data.messages_middle);}
if($(".private_message_overall_admin").length==0)
{$(".private_messenger_messages_disabled_overall").remove();$(".private_messenger_messages_disabled2_overall").remove();$(".private_messenger_messages_disabled3_overall").remove();$(".private_messenger_messages_disabled4_overall").remove();$(".private_messenger_messages_disabled5_overall").remove();$(".private_messenger_messages_disabled6_overall").remove();$(".private_messenger_messages_disabled7_overall").remove();$(".private_messenger_messages_overall > script").slice(1).remove();$(".private_messenger_messages_overall").append(data.messages_disabled);}
$(".private_message_content img.small").each(function()
{$(this).on("load",function()
{var width_original=$(this).get(0).naturalWidth;var height_original=$(this).get(0).naturalHeight;var width=$(this).width();if(width_original>width)
{var height=Math.ceil((width*height_original)/width_original);$(this).attr("height",height);}});});var counter_read=0;$(".private_message_right .private_message_content").each(function()
{var current_message_id=$(this).parent().parent().attr("data-mid");if(data.messages_read.indexOf(current_message_id)!=-1)
{if($("#message"+current_message_id+" .private_message_read").length==0)
{$("#message"+current_message_id+" .private_message_time").append('<br/><span class="private_message_read">&check; '+$("#hidden_private_messenger_read").html()+'</span>');counter_read++;}}});if(counter_read>0)
{var diff=counter_read*17;$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").scrollTop()+diff);}
if(data.new_messages)
{if(data.title_addon!="")
{if(typeof anim_title=="undefined")
{var title=$("#private_messenger_code_overall").attr("data-title");var title_new=data.title_addon;document.title=title_new;anim_title_text=title_new;anim_title_status=1;anim_title=setInterval(function()
{var current_title="";if(anim_title_status==1)
{current_title=$("#private_messenger_code_overall").attr("data-title");anim_title_status=0;}
else
{current_title=anim_title_text;anim_title_status=1;}
document.title=current_title;},1000);}}
if($(".private_messenger_messages_middle_overall").height()==$(".private_messenger_messages_middle_overall").prop("scrollHeight"))
{$.ajax({url:domain_url+'ajax_scripts/mark_messenger_messages_as_read_code.php',type:'POST',data:{code:co,message_history_id:mhid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#messenger_history"+mhid+" .private_messenger_history_entry_time_new_middle").html('');}});}
$("#hint_new_messages").one("click",function()
{$.ajax({url:domain_url+'ajax_scripts/mark_messenger_messages_as_read_code.php',type:'POST',data:{code:co,message_history_id:mhid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").prop("scrollHeight"));$("#hint_new_messages").remove();$("#messenger_history"+mhid+" .private_messenger_history_entry_time_new_middle").html('');}});});$(".private_messenger_messages_middle_overall").removeAttr("data-scrolled");$(".private_messenger_messages_middle_overall").off("scroll").on("scroll",function()
{if(($(this).scrollTop()+$(this).height())==$(this).prop("scrollHeight"))
{if(typeof $(this).attr("data-scrolled")=="undefined")
{$(this).attr("data-scrolled","yes");$.ajax({url:domain_url+'ajax_scripts/mark_messenger_messages_as_read_code.php',type:'POST',data:{code:co,message_history_id:mhid},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{$("#hint_new_messages").remove();$("#messenger_history"+mhid+" .private_messenger_history_entry_time_new_middle").html('');}});}}});}
if($(".private_message_left").length>0)
{$(".private_message_overall_info").remove();}
if(($(".private_messenger_messages_middle_overall").scrollTop()+$(".private_messenger_messages_middle_overall").height())==$(".private_messenger_messages_middle_overall").prop("scrollHeight"))
{$("#hint_new_messages").remove();}
if(data.picture_modals!="")
{$("#private_messenger_code_overall").after(data.picture_modals);}
if(data.recipent_finished_conversation&&!data.recipent_blocked_user)$(".private_messenger_messages_disabled_overall").removeClass("hidden");if(data.recipent_blocked_user)$(".private_messenger_messages_disabled2_overall").removeClass("hidden");if(data.messenger_disabled)$(".private_messenger_messages_disabled5_overall").removeClass("hidden");if(!data.recipent_finished_conversation&&data.recipent_on_vacation)$(".private_messenger_messages_disabled6_overall").removeClass("hidden");if(!data.recipent_on_vacation)$(".private_messenger_messages_disabled6_overall").addClass("hidden");if(!data.recipent_finished_conversation&&data.recipent_inactive)$(".private_messenger_messages_disabled7_overall").removeClass("hidden");if(!data.recipent_inactive)$(".private_messenger_messages_disabled7_overall").addClass("hidden");}
else
{if(typeof anim_title!="undefined")
{clearInterval(anim_title);anim_title=undefined;document.title=$("#private_messenger_code_overall").attr("data-title");}
var counter_read=0;$(".private_message_right .private_message_content").each(function()
{var current_message_id=$(this).parent().parent().attr("data-mid");if(data.messages_read.indexOf(current_message_id)!=-1)
{if($("#message"+current_message_id+" .private_message_read").length==0)
{$("#message"+current_message_id+" .private_message_time").append('<br/><span class="private_message_read">&check; '+$("#hidden_private_messenger_read").html()+'</span>');counter_read++;}}
if(data.messages_remove_trash.indexOf(current_message_id)!=-1)
{if($("#message"+current_message_id+" .private_message_right .delete_message").length>0)
{$("#message"+current_message_id+" .private_message_right .delete_message").remove();}}});if(counter_read>0)
{var diff=counter_read*17;$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").scrollTop()+diff);}
$(".private_message_left .private_message_content").each(function()
{var current_message_id=$(this).parent().parent().attr("data-mid");if(data.messages_deleted.indexOf(current_message_id)!=-1)
{if(typeof $(this).attr("data-deleted")=="undefined")
{var n1=$(this).children().length;var n2=$(this).children().first().nextUntil(".private_message_time").length;var d1;if(n2>1)d1=n1-n2;else d1=n1-n2-1;$(this).children().slice(0,d1).remove();$(this).prepend("<span>This message was deleted.</span>");$(this).attr("data-deleted",1);}}});if(data.recipent_finished_conversation&&!data.recipent_blocked_user)$(".private_messenger_messages_disabled_overall").removeClass("hidden");if(data.recipent_blocked_user)$(".private_messenger_messages_disabled2_overall").removeClass("hidden");if(data.messenger_disabled)$(".private_messenger_messages_disabled5_overall").removeClass("hidden");if(!data.recipent_finished_conversation&&data.recipent_on_vacation)$(".private_messenger_messages_disabled6_overall").removeClass("hidden");if(!data.recipent_on_vacation)$(".private_messenger_messages_disabled6_overall").addClass("hidden");if(!data.recipent_finished_conversation&&data.recipent_inactive)$(".private_messenger_messages_disabled7_overall").removeClass("hidden");if(!data.recipent_inactive)$(".private_messenger_messages_disabled7_overall").addClass("hidden");}
if($(".private_message_overall_admin").length>0)
{$(".private_messenger_messages_bottom_overall").html('');}
if(scroll)$(".private_messenger_messages_middle_overall").scrollTop($(".private_messenger_messages_middle_overall").prop("scrollHeight"));}
$("#private_messenger_code_overall").attr("data-updating","");}).fail(function()
{$("#private_messenger_code_overall").attr("data-updating","");});}}
else
{if(!$("#search_text").hasClass("has_focus"))
{$("#private_messenger_code_overall").attr("data-updating","updating");$.ajax({url:domain_url+'ajax_scripts/update_private_messenger_code.php',type:'POST',data:{code:co,message_history_id:0,search_text:$("#search_text").val()},dataType:'json'}).done(function(data)
{if(data.result=="ok")
{if(data.histories!="")
{$(".private_messenger_histories_histories_overall").html(data.histories);}}
$("#private_messenger_code_overall").attr("data-updating","");}).fail(function()
{$("#private_messenger_code_overall").attr("data-updating","");});}}}}
if($(".private_messenger_history_entry_overall").length==1)
{$(".private_messenger_history_entry_overall").trigger("click");}
else
{if($("#private_messenger_code_overall[data-selected-mhid]").length>0)
{var sel_mhid=$("#private_messenger_code_overall").data("selected-mhid");if($("#messenger_history"+sel_mhid).length>0)
{$("#messenger_history"+sel_mhid).trigger("click");}}}
if($("#vm_player").length>0)
{$("#vm_player").on("ended",function()
{var vmid=$("#vm_player").data("vmid");if(vmid!="0")
{$("#voice_message"+vmid+" .button_play_pause").children("i").removeClass("fa-pause").addClass("fa-play");$("#voice_message"+vmid).data("state","paused");}});$("#vm_player").on("timeupdate",function()
{var vmid=$("#vm_player").data("vmid");if(vmid!="0")
{$("#voice_message"+vmid+" .seek_slider").val(Math.floor($(this)[0].currentTime));$("#voice_message"+vmid+" .current_time").text(convertSecondsToReadableFormat($("#voice_message"+vmid+" .seek_slider").val()));}});}
if($("#private_messenger_code_overall").attr("data-hint-accepted")=="no")
{if($("#private_messenger_code_overall").attr("data-mode")=="member")
{$("body").qtip({content:{title:$("#hidden_private_messenger_modal_first_visit_hint2_title").html(),text:$("#hidden_private_messenger_modal_first_visit_hint2_text").html(),button:true},position:{my:'center',at:'center',target:$(window)},style:{classes:'qtip-bootstrap'},show:{event:false,modal:{on:true,blur:false,escape:false},ready:true},hide:{event:'unfocus'},events:{show:function(event,api)
{$(api.elements.tooltip).on("click","#choice_button_accept",function()
{$(api.elements.tooltip).find(".qtip-close").trigger("click");if(typeof $("#private_messenger_code_overall").attr("data-user-id")!=="undefined")
{$.ajax({url:domain_url+'ajax_scripts/set_status_first_messenger_visit_hint.php',type:'POST',data:{code:$("#private_messenger_code_overall").attr("data-code"),user_id:$("#private_messenger_code_overall").attr("data-user-id")},dataType:'json'}).done(function(data)
{}).fail(function()
{Toast.show({id:'private_messenger_code_overall',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});}
else
{document.cookie='mm_first_hint=1;max-age=31536000;path=/;domain=.happyescorts.com;secure=true;';}});}}});}
if($("#private_messenger_code_overall").attr("data-mode")=="escort")
{$("body").qtip({content:{title:$("#hidden_private_messenger_modal_first_visit_hint_title").html(),text:$("#hidden_private_messenger_modal_first_visit_hint_text").html().replace(/{ESCORT_NAME}/,$(".private_messenger_histories_overall .private_messenger_history_entry_overall").first().find(".private_messenger_history_entry_text_top").attr("title")),button:true},position:{my:'center',at:'center',target:$(window)},style:{classes:'qtip-bootstrap'},show:{event:false,modal:{on:true,blur:false,escape:false},ready:true},hide:{event:'unfocus'},events:{show:function(event,api)
{$(api.elements.tooltip).on("click","#choice_button_accept",function()
{$(api.elements.tooltip).find(".qtip-close").trigger("click");$.ajax({url:domain_url+'ajax_scripts/set_status_first_messenger_visit_hint.php',type:'POST',data:{code:$("#private_messenger_code_overall").attr("data-code"),user_id:$("#private_messenger_code_overall").attr("data-user-id")},dataType:'json'}).done(function(data)
{}).fail(function()
{Toast.show({id:'private_messenger_code_overall',message:$("#hidden_private_messenger_toast_message_connection_error").html(),duration:5000,position:'top',topAdd:50,background:'#FF6D4D',color:'#333',opacity:1});});});}}});}}
$("#legend_trigger").qtip({content:{text:$("#hidden_private_messenger_tooltip_legend").html()},position:{my:'bottom center',at:'top center'},style:{width:250,classes:'qtip-bootstrap'}});var pm_interval=setInterval(updatePrivateMessengerCode,5000,false);}
$(".lazy").lazy({threshold:100});if($("a.execute").length>0)
{var link=$("a.execute").attr("href");window.location.href=link;}
if($("#private_messenger_code_overall").length>0&&$("#private_messenger_code_overall").attr("data-code")=='vaxc7yz1q2vh')
{}});