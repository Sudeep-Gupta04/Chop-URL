package com.url.shortener.controller;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.modles.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")

public class UrlMappingController {
    private UrlMappingService urlMappingService;
    private UserService userService;

    @Autowired
    public UrlMappingController(UrlMappingService urlMappingService, UserService userService) {
        this.urlMappingService = urlMappingService;
        this.userService = userService;
    }

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    // {"originalUrl" : "https:port//exampl.com"}
    // princail auto inject ho raha hai spring security as this is an secure endpoint hence spring security knows who the user is and
    // it store the details in the principal section
    public ResponseEntity<UrlMappingDTO> createShorternUrl(@RequestBody Map<String,String> request , Principal principal){
        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());

        UrlMappingDTO urlMappingDTO =  urlMappingService.createShortUrl(originalUrl,user);
        return ResponseEntity.ok(urlMappingDTO);
    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal){
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam("startDate") String startDate ,
                                                               @RequestParam("endDate") String endDate){

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDateTime start = LocalDate.parse(startDate,formatter).atStartOfDay();
        LocalDateTime end = LocalDate.parse(endDate,formatter).atTime(23,59,59);
        List<ClickEventDTO> clickEventDTOS = urlMappingService.getClickEventsByDate(shortUrl , start , end);
        return ResponseEntity.ok(clickEventDTOS);
    }
    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<LocalDate,Long>> getTotalClicksByDate(Principal principal ,
                                                                    @RequestParam("startDate") String startDate ,
                                                                    @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate start = LocalDate.parse(startDate,formatter);
        LocalDate end = LocalDate.parse(endDate,formatter);

        User user = userService.findByUsername(principal.getName());

        Map<LocalDate,Long> totalclicks = urlMappingService.getTotalClicksByUserAndDate(user,start,end);
        return ResponseEntity.ok(totalclicks);
    }
}
