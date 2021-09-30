import React from 'react'
import {Card,CardContent,Link,Grid,Container} from '@material-ui/core';
const NewsVaccine = ({vaccineNews}) => {
    console.log(vaccineNews);
    return (
        <Container>
            <Grid container>
                {
                vaccineNews.map((n)=>{
                    return (
                            <Grid className="" item md={4} sm={6} xs={12} xl={3}>
                                <Card className="news_card">
                                    <CardContent>
                                        <h3 className="news_title">{n.title}</h3>
                                        <p className="news_content">{n.content}</p>
                                                
                                        <div className="news_last">
                                            <Link href={n.link} variant='p'>Read More</Link>
                                            <span className="news_reference">{n.reference}</span>
                                        </div>
                                        <div className="news_publish">
                                            <strong> Publish Date : </strong>
                                            <p className="news_publish">{n.pubDate}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                    )
                })
                }
            </Grid>
            
        </Container>
        
    )
}

export default NewsVaccine


                        