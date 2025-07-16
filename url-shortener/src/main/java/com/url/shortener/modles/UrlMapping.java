package com.url.shortener.modles;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity

public class UrlMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String originalUrl;
    private String shortenUrl;
    private int clickCount = 0;
    private LocalDateTime createdDate;


    @ManyToOne
    @JoinColumn(name = "user_id")   // joining of user to urlmapping table as it is many to one mapping one user can have multiple urlshorten
    private User user;              // but one url shorten is always linked to one table only


    @OneToMany(mappedBy = "urlMapping")
    private List<ClickEvent> clickEvent;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public String getShortenUrl() {
        return shortenUrl;
    }

    public void setShortenUrl(String shortenUrl) {
        this.shortenUrl = shortenUrl;
    }

    public int getClickCount() {
        return clickCount;
    }

    public void setClickCount(int clickCount) {
        this.clickCount = clickCount;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ClickEvent> getClickEvent() {
        return clickEvent;
    }

    public void setClickEvent(List<ClickEvent> clickEvent) {
        this.clickEvent = clickEvent;
    }
}
