package com.url.shortener.dtos;

import java.time.LocalDate;

public class ClickEventDTO {
    private LocalDate clickDate;  // ✅ Change from LocalDateTime to LocalDate
    private Long count;

    public LocalDate getClickDate() {
        return clickDate;
    }

    public void setClickDate(LocalDate clickDate) {  // ✅ Updated parameter type
        this.clickDate = clickDate;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
