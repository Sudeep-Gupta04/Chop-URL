package com.url.shortener.service;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.modles.ClickEvent;
import com.url.shortener.modles.UrlMapping;
import com.url.shortener.modles.User;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;


    public UrlMappingService(UrlMappingRepository urlMappingRepository , ClickEventRepository clickEventRepository) {
        this.urlMappingRepository = urlMappingRepository;
        this.clickEventRepository = clickEventRepository;
    }

    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        urlMapping.setShortenUrl(shortUrl);


        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return converttoUrlMappingDto(savedUrlMapping);
    }

    private UrlMappingDTO converttoUrlMappingDto(UrlMapping urlMapping){
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalurl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShorturl(urlMapping.getShortenUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        return urlMappingDTO;
    }
    private String generateShortUrl() {
        String characters = "ABCDEFGHIjKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);
        while (shortUrl.length() < 8) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));  // ✅ Fix: Ensure valid index
        }
        return shortUrl.toString();
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        List<UrlMapping> urls = urlMappingRepository.findByUser(user);
        List<UrlMappingDTO> urldtos = new ArrayList<>();
        for(UrlMapping url:urls){
            urldtos.add(converttoUrlMappingDto(url));
        }
        return urldtos;
    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepository.findByShortenUrl(shortUrl);

        if (urlMapping != null) {
            List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end);
            Map<LocalDate, Long> groupedClicks = new TreeMap<>();  //  TreeMap maintains ascending order of dates

            // Grouping click events by date
            for (ClickEvent clickEvent : clickEvents) {
                LocalDate date = clickEvent.getClickDate().toLocalDate();  // Extract date
                groupedClicks.put(date, groupedClicks.getOrDefault(date, 0L) + 1);  // Count clicks per day
            }

            // Convert Map to List of ClickEventDTO (No need to sort, TreeMap maintains order)
            List<ClickEventDTO> result = new ArrayList<>();
            for (Map.Entry<LocalDate, Long> entry : groupedClicks.entrySet()) {
                ClickEventDTO clickEventDTO = new ClickEventDTO();
                clickEventDTO.setClickDate(entry.getKey());  //  Set the grouped date
                clickEventDTO.setCount(entry.getValue());  // Set the count
                result.add(clickEventDTO);
            }

            return result;
        }
        return new ArrayList<>();  //  Return empty list instead of null
    }


    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        List<UrlMapping> urls = urlMappingRepository.findByUser(user);
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(
                urls, start.atStartOfDay(), end.plusDays(1).atStartOfDay()
        );

        TreeMap<LocalDate, Long> clickCountOnADate = new TreeMap<>();

        for (ClickEvent clickEvent : clickEvents) {
            LocalDate date = clickEvent.getClickDate().toLocalDate();
            clickCountOnADate.put(date, clickCountOnADate.getOrDefault(date, 0L) + 1);
        }

        return clickCountOnADate; // ✅ Never returns null
    }


    public UrlMapping getOriginalurl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortenUrl(shortUrl);
        if(urlMapping!=null){
            // increase the count
            urlMapping.setClickCount(urlMapping.getClickCount()+1);
            urlMappingRepository.save(urlMapping);

            // recording a click event;
            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepository.save(clickEvent);
        }
        return urlMapping;
    }
}
