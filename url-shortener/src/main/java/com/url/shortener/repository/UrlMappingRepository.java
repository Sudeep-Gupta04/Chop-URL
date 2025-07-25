package com.url.shortener.repository;

import com.url.shortener.modles.UrlMapping;
import com.url.shortener.modles.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {

    UrlMapping findByShortenUrl(String shortenUrl);
    List<UrlMapping> findByUser(User user);
}

